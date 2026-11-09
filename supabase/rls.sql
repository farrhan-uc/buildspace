ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_are_private" ON profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "projects_are_private" ON projects
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "project_stages_are_private" ON project_stages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = project_stages.project_id AND p.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = project_stages.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "rate_overrides_are_private" ON rate_overrides
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = rate_overrides.project_id AND p.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = rate_overrides.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "rates_public_read" ON rates FOR SELECT USING (true);
CREATE POLICY "rates_admin_write" ON rates FOR ALL USING (false) WITH CHECK (false);

CREATE POLICY "suppliers_public_read" ON suppliers FOR SELECT USING (verified = TRUE OR auth.uid() IS NOT NULL);
CREATE POLICY "suppliers_admin_write" ON suppliers FOR ALL USING (false) WITH CHECK (false);

CREATE POLICY "saved_suppliers_private" ON saved_suppliers
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shared_reports_private" ON shared_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = shared_reports.project_id AND p.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = shared_reports.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "plan_entitlements_private" ON plan_entitlements
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
