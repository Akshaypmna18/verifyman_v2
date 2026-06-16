type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type D1Result<T = Record<string, unknown>> = {
  results: T[];
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
};

type D1Database = {
  prepare(query: string): D1PreparedStatement;
};

type Env = {
  DATABASE: D1Database;
};

type RequestInput = {
  id?: string;
  referenceNumber?: string;
  verificationType?: string;
  serviceType?: string;
  candidateFirstName?: string | null;
  candidateLastName?: string | null;
  candidateEmail?: string | null;
  candidateMobile?: string | null;
  candidate?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    mobile?: string | null;
  };
  verificationData?: unknown;
  data?: unknown;
  status?: string;
  createdBy?: string | null;
};

type RequestRow = {
  id: string;
  referenceNumber: string;
  verificationType: string;
  candidateFirstName: string | null;
  candidateLastName: string | null;
  candidateEmail: string | null;
  candidateMobile: string | null;
  verificationData: JsonValue;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
};

const COLLECTION_PATHS = new Set([
  "/api/requests",
  "/api/verification-requests",
]);

function jsonResponse(body: unknown, init?: number | ResponseInit): Response {
  const responseInit =
    typeof init === "number" ? { status: init } : init ?? { status: 200 };
  const headers = new Headers(responseInit.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Headers", "content-type");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  );

  return new Response(JSON.stringify(body), {
    ...responseInit,
    headers,
  });
}

function corsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function parseJsonValue(value: string | null): JsonValue {
  if (!value) return null;
  try {
    return JSON.parse(value) as JsonValue;
  } catch {
    return value;
  }
}

function normalizeJsonValue(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value ?? null)) as JsonValue;
}

function makeReferenceNumber(now = new Date()): string {
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = String(Math.floor(Math.random() * 900) + 100);
  return `VM-${stamp}-${suffix}`;
}

function toRequestRow(row: Record<string, unknown>): RequestRow {
  return {
    id: String(row.id ?? ""),
    referenceNumber: String(row.reference_number ?? ""),
    verificationType: String(row.verification_type ?? ""),
    candidateFirstName: asTrimmedString(row.candidate_first_name),
    candidateLastName: asTrimmedString(row.candidate_last_name),
    candidateEmail: asTrimmedString(row.candidate_email),
    candidateMobile: asTrimmedString(row.candidate_mobile),
    verificationData: parseJsonValue(
      typeof row.verification_data === "string"
        ? row.verification_data
        : row.verification_data == null
          ? null
          : JSON.stringify(row.verification_data),
    ),
    status: String(row.status ?? "pending"),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    createdBy: asTrimmedString(row.created_by),
  };
}

async function readJsonBody(request: Request): Promise<RequestInput | null> {
  try {
    const body = (await request.json()) as unknown;
    return isRecord(body) ? (body as RequestInput) : null;
  } catch {
    return null;
  }
}

async function listRequests(env: Env): Promise<Response> {
  const result = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests ORDER BY created_at DESC",
  ).all();

  return jsonResponse({
    requests: result.results.map((row) => toRequestRow(row)),
  });
}

async function getRequest(env: Env, id: string): Promise<Response> {
  const row = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1",
  )
    .bind(id)
    .first();

  if (!row) {
    return jsonResponse({ error: "not found" }, 404);
  }

  return jsonResponse({ request: toRequestRow(row) });
}

async function createRequest(env: Env, body: RequestInput): Promise<Response> {
  const verificationType =
    asTrimmedString(body.verificationType) ??
    asTrimmedString(body.serviceType);
  if (!verificationType) {
    return jsonResponse({ error: "verificationType is required" }, 400);
  }

  const now = new Date().toISOString();
  const id = asTrimmedString(body.id) ?? crypto.randomUUID();
  const referenceNumber =
    asTrimmedString(body.referenceNumber) ?? makeReferenceNumber();
  const status = asTrimmedString(body.status) ?? "pending";
  const verificationData = normalizeJsonValue(
    body.verificationData ?? body.data ?? null,
  );

  await env.DATABASE.prepare(
    `INSERT INTO verification_requests (
      id,
      reference_number,
      verification_type,
      candidate_first_name,
      candidate_last_name,
      candidate_email,
      candidate_mobile,
      verification_data,
      status,
      created_at,
      updated_at,
      created_by
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`,
  )
    .bind(
      id,
      referenceNumber,
      verificationType,
      asTrimmedString(body.candidateFirstName) ??
        asTrimmedString(body.candidate?.firstName),
      asTrimmedString(body.candidateLastName) ??
        asTrimmedString(body.candidate?.lastName),
      asTrimmedString(body.candidateEmail) ??
        asTrimmedString(body.candidate?.email),
      asTrimmedString(body.candidateMobile) ??
        asTrimmedString(body.candidate?.mobile),
      JSON.stringify(verificationData),
      status,
      now,
      now,
      asTrimmedString(body.createdBy),
    )
    .run();

  const request = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1",
  )
    .bind(id)
    .first();

  return jsonResponse({ request: toRequestRow(request ?? {}) }, 201);
}

async function updateRequest(
  env: Env,
  id: string,
  body: RequestInput,
): Promise<Response> {
  const existing = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1",
  )
    .bind(id)
    .first();

  if (!existing) {
    return jsonResponse({ error: "not found" }, 404);
  }

  const current = toRequestRow(existing);
  const nextVerificationData =
    body.verificationData !== undefined || body.data !== undefined
      ? normalizeJsonValue(body.verificationData ?? body.data ?? null)
      : current.verificationData;

  const next = {
    referenceNumber:
      asTrimmedString(body.referenceNumber) ?? current.referenceNumber,
    verificationType:
      asTrimmedString(body.verificationType) ??
      asTrimmedString(body.serviceType) ??
      current.verificationType,
    candidateFirstName:
      body.candidateFirstName === undefined
        ? body.candidate?.firstName === undefined
          ? current.candidateFirstName
          : asTrimmedString(body.candidate?.firstName)
        : asTrimmedString(body.candidateFirstName),
    candidateLastName:
      body.candidateLastName === undefined
        ? body.candidate?.lastName === undefined
          ? current.candidateLastName
          : asTrimmedString(body.candidate?.lastName)
        : asTrimmedString(body.candidateLastName),
    candidateEmail:
      body.candidateEmail === undefined
        ? body.candidate?.email === undefined
          ? current.candidateEmail
          : asTrimmedString(body.candidate?.email)
        : asTrimmedString(body.candidateEmail),
    candidateMobile:
      body.candidateMobile === undefined
        ? body.candidate?.mobile === undefined
          ? current.candidateMobile
          : asTrimmedString(body.candidate?.mobile)
        : asTrimmedString(body.candidateMobile),
    verificationData: nextVerificationData,
    status: asTrimmedString(body.status) ?? current.status,
    createdBy:
      body.createdBy === undefined
        ? current.createdBy
        : asTrimmedString(body.createdBy),
  };

  const now = new Date().toISOString();
  await env.DATABASE.prepare(
    `UPDATE verification_requests
     SET reference_number = ?2,
         verification_type = ?3,
         candidate_first_name = ?4,
         candidate_last_name = ?5,
         candidate_email = ?6,
         candidate_mobile = ?7,
         verification_data = ?8,
         status = ?9,
         updated_at = ?10,
         created_by = ?11
     WHERE id = ?1`,
  )
    .bind(
      id,
      next.referenceNumber,
      next.verificationType,
      next.candidateFirstName,
      next.candidateLastName,
      next.candidateEmail,
      next.candidateMobile,
      JSON.stringify(next.verificationData),
      next.status,
      now,
      next.createdBy,
    )
    .run();

  const updated = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1",
  )
    .bind(id)
    .first();

  return jsonResponse({ request: toRequestRow(updated ?? {}) });
}

async function deleteRequest(env: Env, id: string): Promise<Response> {
  const existing = await env.DATABASE.prepare(
    "SELECT id FROM verification_requests WHERE id = ?1 LIMIT 1",
  )
    .bind(id)
    .first();

  if (!existing) {
    return jsonResponse({ error: "not found" }, 404);
  }

  await env.DATABASE.prepare("DELETE FROM verification_requests WHERE id = ?1")
    .bind(id)
    .run();

  return jsonResponse({ deleted: true, id });
}

function isCollectionPath(pathname: string): boolean {
  return COLLECTION_PATHS.has(pathname);
}

function getItemId(pathname: string): string | null {
  for (const base of COLLECTION_PATHS) {
    if (pathname.startsWith(`${base}/`)) {
      const id = pathname.slice(base.length + 1).trim();
      return id || null;
    }
  }
  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return corsPreflight();
    }

    if (url.pathname === "/api" || url.pathname === "/health") {
      return jsonResponse({
        name: "verifyman-crud-api",
        status: "ok",
      });
    }

    if (isCollectionPath(url.pathname)) {
      if (request.method === "GET") {
        return listRequests(env);
      }

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        if (!body) {
          return jsonResponse({ error: "invalid json body" }, 400);
        }
        return createRequest(env, body);
      }

      return jsonResponse({ error: "method not allowed" }, 405);
    }

    const id = getItemId(url.pathname);
    if (id) {
      if (request.method === "GET") {
        return getRequest(env, id);
      }

      if (request.method === "PATCH" || request.method === "PUT") {
        const body = await readJsonBody(request);
        if (!body) {
          return jsonResponse({ error: "invalid json body" }, 400);
        }
        return updateRequest(env, id, body);
      }

      if (request.method === "DELETE") {
        return deleteRequest(env, id);
      }

      return jsonResponse({ error: "method not allowed" }, 405);
    }

    return jsonResponse({ error: "not found" }, 404);
  },
};
