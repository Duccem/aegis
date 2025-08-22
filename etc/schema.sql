-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.account (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  account_id text NOT NULL,
  provider_id text NOT NULL,
  user_id uuid NOT NULL,
  access_token text,
  refresh_token text,
  id_token text,
  access_token_expires_at timestamp without time zone,
  refresh_token_expires_at timestamp without time zone,
  scope text,
  password text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.brand (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT brand_pkey PRIMARY KEY (id),
  CONSTRAINT brand_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id),
  CONSTRAINT category_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.invitation (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  inviter_id uuid NOT NULL,
  organization_id uuid NOT NULL,
  role text NOT NULL,
  status text NOT NULL,
  team_id uuid,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT invitation_pkey PRIMARY KEY (id),
  CONSTRAINT invitation_inviter_id_user_id_fk FOREIGN KEY (inviter_id) REFERENCES public.user(id),
  CONSTRAINT invitation_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.item (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text NOT NULL UNIQUE,
  description text NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'active'::item_status,
  type USER-DEFINED NOT NULL DEFAULT 'product'::item_types,
  image ARRAY NOT NULL DEFAULT '{}'::text[],
  unit_id uuid NOT NULL,
  brand_id uuid NOT NULL,
  organization_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT item_pkey PRIMARY KEY (id),
  CONSTRAINT item_brand_id_brand_id_fk FOREIGN KEY (brand_id) REFERENCES public.brand(id),
  CONSTRAINT item_unit_id_unit_id_fk FOREIGN KEY (unit_id) REFERENCES public.unit(id),
  CONSTRAINT item_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.item_category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT item_category_pkey PRIMARY KEY (id),
  CONSTRAINT item_category_item_id_item_id_fk FOREIGN KEY (item_id) REFERENCES public.item(id),
  CONSTRAINT item_category_category_id_category_id_fk FOREIGN KEY (category_id) REFERENCES public.category(id)
);
CREATE TABLE public.member (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  organization_id uuid NOT NULL,
  role text NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT member_pkey PRIMARY KEY (id),
  CONSTRAINT member_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id),
  CONSTRAINT member_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.organization (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  logo text,
  metadata text,
  plan text NOT NULL DEFAULT 'free'::text,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT organization_pkey PRIMARY KEY (id)
);
CREATE TABLE public.organization_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  organization_members integer NOT NULL DEFAULT 0,
  ai_completions integer NOT NULL DEFAULT 0,
  products_created integer NOT NULL DEFAULT 0,
  invoice_sent integer NOT NULL DEFAULT 0,
  CONSTRAINT organization_metrics_pkey PRIMARY KEY (id),
  CONSTRAINT organization_metrics_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.session (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  expires_at timestamp without time zone NOT NULL,
  token text NOT NULL UNIQUE,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  ip_address text,
  user_agent text,
  user_id uuid NOT NULL,
  active_organization_id uuid,
  active_team_id uuid,
  CONSTRAINT session_pkey PRIMARY KEY (id),
  CONSTRAINT session_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.stock (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL,
  store_id uuid NOT NULL,
  quantity numeric NOT NULL DEFAULT '0'::numeric,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT stock_pkey PRIMARY KEY (id),
  CONSTRAINT stock_item_id_item_id_fk FOREIGN KEY (item_id) REFERENCES public.item(id),
  CONSTRAINT stock_store_id_store_id_fk FOREIGN KEY (store_id) REFERENCES public.store(id)
);
CREATE TABLE public.stock_movement (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL,
  store_id uuid NOT NULL,
  type USER-DEFINED NOT NULL DEFAULT 'addition'::stock_movement_type,
  quantity numeric NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT stock_movement_pkey PRIMARY KEY (id),
  CONSTRAINT stock_movement_store_id_store_id_fk FOREIGN KEY (store_id) REFERENCES public.store(id),
  CONSTRAINT stock_movement_item_id_item_id_fk FOREIGN KEY (item_id) REFERENCES public.item(id)
);
CREATE TABLE public.store (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'active'::store_status,
  organization_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT store_pkey PRIMARY KEY (id),
  CONSTRAINT store_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.team (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT team_pkey PRIMARY KEY (id),
  CONSTRAINT team_organization_id_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
CREATE TABLE public.team_member (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  team_id uuid NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT team_member_pkey PRIMARY KEY (id),
  CONSTRAINT team_member_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.user(id),
  CONSTRAINT team_member_team_id_team_id_fk FOREIGN KEY (team_id) REFERENCES public.team(id)
);
CREATE TABLE public.unit (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  abbreviation text NOT NULL,
  divisible boolean NOT NULL DEFAULT false,
  CONSTRAINT unit_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  email_verified boolean NOT NULL,
  image text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);
CREATE TABLE public.verification (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  value text NOT NULL,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  CONSTRAINT verification_pkey PRIMARY KEY (id)
);