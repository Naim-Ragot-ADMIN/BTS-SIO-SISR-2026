CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  submission_type TEXT NOT NULL,
  service TEXT,
  source_page TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  subject TEXT,
  message TEXT,
  summary TEXT,
  payload_json TEXT,
  metadata_json TEXT,
  status TEXT DEFAULT 'received',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(submission_type);
CREATE INDEX IF NOT EXISTS idx_submissions_service ON submissions(service);
