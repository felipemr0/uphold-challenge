CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS oscillations (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  bot_config_id uuid NOT NULL,
  rate numeric NOT NULL,
  price_type text NOT NULL,
  pair text NOT NULL,
  timestamp timestamp with time zone DEFAULT now() NOT NULL,
  direction text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS bot_config
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "interval" integer NOT NULL,
    deviation double precision NOT NULL,
    CONSTRAINT bot_config_pkey PRIMARY KEY (id)
);