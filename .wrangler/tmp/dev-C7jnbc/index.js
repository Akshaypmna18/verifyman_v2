var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/index.ts
var COLLECTION_PATHS = /* @__PURE__ */ new Set([
  "/api/requests",
  "/api/verification-requests"
]);
function jsonResponse(body, init) {
  const responseInit = typeof init === "number" ? { status: init } : init ?? { status: 200 };
  const headers = new Headers(responseInit.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Headers", "content-type");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  return new Response(JSON.stringify(body), {
    ...responseInit,
    headers
  });
}
__name(jsonResponse, "jsonResponse");
function corsPreflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    }
  });
}
__name(corsPreflight, "corsPreflight");
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
__name(isRecord, "isRecord");
function asTrimmedString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}
__name(asTrimmedString, "asTrimmedString");
function parseJsonValue(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
__name(parseJsonValue, "parseJsonValue");
function normalizeJsonValue(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}
__name(normalizeJsonValue, "normalizeJsonValue");
function makeReferenceNumber(now = /* @__PURE__ */ new Date()) {
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = String(Math.floor(Math.random() * 900) + 100);
  return `VM-${stamp}-${suffix}`;
}
__name(makeReferenceNumber, "makeReferenceNumber");
function toRequestRow(row) {
  return {
    id: String(row.id ?? ""),
    referenceNumber: String(row.reference_number ?? ""),
    verificationType: String(row.verification_type ?? ""),
    candidateFirstName: asTrimmedString(row.candidate_first_name),
    candidateLastName: asTrimmedString(row.candidate_last_name),
    candidateEmail: asTrimmedString(row.candidate_email),
    candidateMobile: asTrimmedString(row.candidate_mobile),
    verificationData: parseJsonValue(
      typeof row.verification_data === "string" ? row.verification_data : row.verification_data == null ? null : JSON.stringify(row.verification_data)
    ),
    status: String(row.status ?? "pending"),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    createdBy: asTrimmedString(row.created_by)
  };
}
__name(toRequestRow, "toRequestRow");
async function readJsonBody(request) {
  try {
    const body = await request.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}
__name(readJsonBody, "readJsonBody");
async function listRequests(env) {
  const result = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests ORDER BY created_at DESC"
  ).all();
  return jsonResponse({
    requests: result.results.map((row) => toRequestRow(row))
  });
}
__name(listRequests, "listRequests");
async function getRequest(env, id) {
  const row = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1"
  ).bind(id).first();
  if (!row) {
    return jsonResponse({ error: "not found" }, 404);
  }
  return jsonResponse({ request: toRequestRow(row) });
}
__name(getRequest, "getRequest");
async function createRequest(env, body) {
  const verificationType = asTrimmedString(body.verificationType) ?? asTrimmedString(body.serviceType);
  if (!verificationType) {
    return jsonResponse({ error: "verificationType is required" }, 400);
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const id = asTrimmedString(body.id) ?? crypto.randomUUID();
  const referenceNumber = asTrimmedString(body.referenceNumber) ?? makeReferenceNumber();
  const status = asTrimmedString(body.status) ?? "pending";
  const verificationData = normalizeJsonValue(
    body.verificationData ?? body.data ?? null
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
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`
  ).bind(
    id,
    referenceNumber,
    verificationType,
    asTrimmedString(body.candidateFirstName) ?? asTrimmedString(body.candidate?.firstName),
    asTrimmedString(body.candidateLastName) ?? asTrimmedString(body.candidate?.lastName),
    asTrimmedString(body.candidateEmail) ?? asTrimmedString(body.candidate?.email),
    asTrimmedString(body.candidateMobile) ?? asTrimmedString(body.candidate?.mobile),
    JSON.stringify(verificationData),
    status,
    now,
    now,
    asTrimmedString(body.createdBy)
  ).run();
  const request = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1"
  ).bind(id).first();
  return jsonResponse({ request: toRequestRow(request ?? {}) }, 201);
}
__name(createRequest, "createRequest");
async function updateRequest(env, id, body) {
  const existing = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1"
  ).bind(id).first();
  if (!existing) {
    return jsonResponse({ error: "not found" }, 404);
  }
  const current = toRequestRow(existing);
  const nextVerificationData = body.verificationData !== void 0 || body.data !== void 0 ? normalizeJsonValue(body.verificationData ?? body.data ?? null) : current.verificationData;
  const next = {
    referenceNumber: asTrimmedString(body.referenceNumber) ?? current.referenceNumber,
    verificationType: asTrimmedString(body.verificationType) ?? asTrimmedString(body.serviceType) ?? current.verificationType,
    candidateFirstName: body.candidateFirstName === void 0 ? body.candidate?.firstName === void 0 ? current.candidateFirstName : asTrimmedString(body.candidate?.firstName) : asTrimmedString(body.candidateFirstName),
    candidateLastName: body.candidateLastName === void 0 ? body.candidate?.lastName === void 0 ? current.candidateLastName : asTrimmedString(body.candidate?.lastName) : asTrimmedString(body.candidateLastName),
    candidateEmail: body.candidateEmail === void 0 ? body.candidate?.email === void 0 ? current.candidateEmail : asTrimmedString(body.candidate?.email) : asTrimmedString(body.candidateEmail),
    candidateMobile: body.candidateMobile === void 0 ? body.candidate?.mobile === void 0 ? current.candidateMobile : asTrimmedString(body.candidate?.mobile) : asTrimmedString(body.candidateMobile),
    verificationData: nextVerificationData,
    status: asTrimmedString(body.status) ?? current.status,
    createdBy: body.createdBy === void 0 ? current.createdBy : asTrimmedString(body.createdBy)
  };
  const now = (/* @__PURE__ */ new Date()).toISOString();
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
     WHERE id = ?1`
  ).bind(
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
    next.createdBy
  ).run();
  const updated = await env.DATABASE.prepare(
    "SELECT * FROM verification_requests WHERE id = ?1 LIMIT 1"
  ).bind(id).first();
  return jsonResponse({ request: toRequestRow(updated ?? {}) });
}
__name(updateRequest, "updateRequest");
async function deleteRequest(env, id) {
  const existing = await env.DATABASE.prepare(
    "SELECT id FROM verification_requests WHERE id = ?1 LIMIT 1"
  ).bind(id).first();
  if (!existing) {
    return jsonResponse({ error: "not found" }, 404);
  }
  await env.DATABASE.prepare("DELETE FROM verification_requests WHERE id = ?1").bind(id).run();
  return jsonResponse({ deleted: true, id });
}
__name(deleteRequest, "deleteRequest");
function isCollectionPath(pathname) {
  return COLLECTION_PATHS.has(pathname);
}
__name(isCollectionPath, "isCollectionPath");
function getItemId(pathname) {
  for (const base of COLLECTION_PATHS) {
    if (pathname.startsWith(`${base}/`)) {
      const id = pathname.slice(base.length + 1).trim();
      return id || null;
    }
  }
  return null;
}
__name(getItemId, "getItemId");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return corsPreflight();
    }
    if (url.pathname === "/api" || url.pathname === "/health") {
      return jsonResponse({
        name: "verifyman-crud-api",
        status: "ok"
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
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-We1BTH/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-We1BTH/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
