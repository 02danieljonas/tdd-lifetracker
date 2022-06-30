\echo 'Delete and recreate lifetracker-schema db'
\prompt 'Return for any key or control-c to cancel >' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql