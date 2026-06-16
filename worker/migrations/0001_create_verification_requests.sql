CREATE TABLE IF NOT EXISTS verification_requests (
  id TEXT PRIMARY KEY,
  reference_number TEXT NOT NULL,
  verification_type TEXT NOT NULL,
  candidate_first_name TEXT,
  candidate_last_name TEXT,
  candidate_email TEXT,
  candidate_mobile TEXT,
  verification_data TEXT NOT NULL DEFAULT 'null',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_verification_requests_created_at
  ON verification_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_verification_requests_status
  ON verification_requests(status);
