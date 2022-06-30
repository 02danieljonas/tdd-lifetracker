\echo 'Delete and recreate lifetracker-schema db'
\prompt 'Return for any key or contro-c to cancel >' answer

DROP DATABASE IF EXISTS lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql