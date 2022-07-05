\echo 'Delete and recreate lifetracker-schema db'
\prompt 'Return any key to continue or control-c to cancel >' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql