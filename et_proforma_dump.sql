--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--clear
-- Name: et_proforma; Type: SCHEMA; Schema: -; Owner: nilesoft
--

CREATE SCHEMA et_proforma;


ALTER SCHEMA et_proforma OWNER TO nilesoft;

--
-- Name: enum_users_role; Type: TYPE; Schema: et_proforma; Owner: nilesoft
--

CREATE TYPE et_proforma.enum_users_role AS ENUM (
    'ADMIN',
    'CUSTOMER',
    'SUPPLIER'
);


ALTER TYPE et_proforma.enum_users_role OWNER TO nilesoft;

SET default_tablespace = '';



--
-- Name: PasswordResets; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma."PasswordResets" (
    id character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma."PasswordResets" OWNER TO nilesoft;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE et_proforma."SequelizeMeta" OWNER TO nilesoft;

--
-- Name: categories; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE et_proforma.categories OWNER TO nilesoft;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.categories_id_seq OWNER TO nilesoft;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.categories_id_seq OWNED BY et_proforma.categories.id;


--
-- Name: notifications; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.notifications (
     id integer NOT NULL,
    specificid integer,
    type character varying(255),
    message character varying(255),
    "recipientId" integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(255) DEFAULT 'NA'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE et_proforma.notifications OWNER TO nilesoft;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.notifications_id_seq OWNER TO nilesoft;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.notifications_id_seq OWNED BY et_proforma.notifications.id;


--
-- Name: orderdetails; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.orderdetails (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    title character varying(255),
    price double precision,
    quantity integer,
    "productId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma.orderdetails OWNER TO nilesoft;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.orderdetails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.orderdetails_id_seq OWNER TO nilesoft;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.orderdetails_id_seq OWNED BY et_proforma.orderdetails.id;


--
-- Name: orders; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.orders (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "supplierId" integer NOT NULL,
    "totalPrice" integer NOT NULL,
    tax double precision,
    "shippingCost" double precision,
    status character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "referenceNumber" character varying(255) DEFAULT 'NA'::character varying,
    "purchaseRequestId" integer NOT NULL
);


ALTER TABLE et_proforma.orders OWNER TO nilesoft;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.orders_id_seq OWNER TO nilesoft;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.orders_id_seq OWNED BY et_proforma.orders.id;


--
-- Name: payments; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.payments (
    id integer NOT NULL,
    amount double precision NOT NULL,
    "paidAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "paymentMethod" character varying(255),
    "userId" integer NOT NULL,
    "orderId" integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    "referenceNumber" character varying(255) DEFAULT 'NA'::character varying,
    "fullName" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE et_proforma.payments OWNER TO nilesoft;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.payments_id_seq OWNER TO nilesoft;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.payments_id_seq OWNED BY et_proforma.payments.id;


--
-- Name: productPrices; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma."productPrices" (
      id integer NOT NULL,
    "productId" integer NOT NULL,
    price double precision NOT NULL,
    "quotationId" integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "disCountPrice" double precision
);


ALTER TABLE et_proforma."productPrices" OWNER TO nilesoft;

--
-- Name: productPrices_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma."productPrices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma."productPrices_id_seq" OWNER TO nilesoft;

--
-- Name: productPrices_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma."productPrices_id_seq" OWNED BY et_proforma."productPrices".id;


--
-- Name: products; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.products (
    id integer NOT NULL,
    "purchaseRequestId" integer NOT NULL,
    title character varying(255) NOT NULL,
    "Description" character varying(255),
    code character varying(255),
    manufacturer character varying(255),
    mark character varying(255),
    model character varying(255),
    "partNumber" character varying(255),
    quantity character varying(255),
    uom character varying(255),
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE et_proforma.products OWNER TO nilesoft;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.products_id_seq OWNER TO nilesoft;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.products_id_seq OWNED BY et_proforma.products.id;


--
-- Name: purchaseRequests; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma."purchaseRequests" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "categoryId" integer NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now(),
    "userId" integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    remark character varying(255) DEFAULT 'NA'::character varying,
    "addressDetail" character varying(255) DEFAULT 'NA'::character varying,
    "estimatedDelivery" character varying(255) DEFAULT 'NA'::character varying,
    "imageUrl" text,
    "referenceNumber" character varying(255) DEFAULT 'NA'::character varying
);


ALTER TABLE et_proforma."purchaseRequests" OWNER TO nilesoft;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma."purchaseRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma."purchaseRequests_id_seq" OWNER TO nilesoft;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma."purchaseRequests_id_seq" OWNED BY et_proforma."purchaseRequests".id;


--
-- Name: quotations; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.quotations (
      id integer NOT NULL,
    "supplierId" integer,
    "customerId" integer,
    "shippingPrice" double precision,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(255) NOT NULL,
    "purchaseRequestId" integer,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "otherPayment" double precision,
    "availabilityDate" character varying(255)
);


ALTER TABLE et_proforma.quotations OWNER TO nilesoft;

--
-- Name: quotations_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.quotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.quotations_id_seq OWNER TO nilesoft;

--
-- Name: quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.quotations_id_seq OWNED BY et_proforma.quotations.id;


--
-- Name: shippings; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.shippings (
       id integer NOT NULL,
    "orderId" integer NOT NULL,
    address character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE et_proforma.shippings OWNER TO nilesoft;

--
-- Name: shippings_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.shippings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.shippings_id_seq OWNER TO nilesoft;

--
-- Name: shippings_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.shippings_id_seq OWNED BY et_proforma.shippings.id;


--
-- Name: suppliers; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.suppliers (
   id integer NOT NULL,
    name character varying(255) NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    email character varying(255),
    address character varying(255),
    phonenumber character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    country double precision,
    city integer,
    "houseNumber" character varying(255),
    "contactNumber" character varying(255),
    "specificName" character varying(255),
    "subCity" character varying(255),
    "isVerified" boolean
);


ALTER TABLE et_proforma.suppliers OWNER TO nilesoft;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.suppliers_id_seq OWNER TO nilesoft;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.suppliers_id_seq OWNED BY et_proforma.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.users (
     id integer NOT NULL,
    username character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    "phoneNumber" character varying(255),
    address character varying(255),
    email character varying(255),
    password character varying(255),
    role et_proforma.enum_users_role,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    status character varying(255) DEFAULT 'PENDING'::character varying,
    "isVerified" boolean DEFAULT false,
    profilepicture character varying(255)
);


ALTER TABLE et_proforma.users OWNER TO nilesoft;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.users_id_seq OWNER TO nilesoft;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.users_id_seq OWNED BY et_proforma.users.id;


--
-- Name: verifications; Type: TABLE; Schema: et_proforma; Owner: nilesoft
--

CREATE TABLE et_proforma.verifications (
    id integer NOT NULL,
    token character varying(255),
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma.verifications OWNER TO nilesoft;

--
-- Name: verifications_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: nilesoft
--

CREATE SEQUENCE et_proforma.verifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.verifications_id_seq OWNER TO nilesoft;

--
-- Name: verifications_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: nilesoft
--

ALTER SEQUENCE et_proforma.verifications_id_seq OWNED BY et_proforma.verifications.id;


--
-- Name: categories id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.categories ALTER COLUMN id SET DEFAULT nextval('et_proforma.categories_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.notifications ALTER COLUMN id SET DEFAULT nextval('et_proforma.notifications_id_seq'::regclass);


--
-- Name: orderdetails id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orderdetails ALTER COLUMN id SET DEFAULT nextval('et_proforma.orderdetails_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orders ALTER COLUMN id SET DEFAULT nextval('et_proforma.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.payments ALTER COLUMN id SET DEFAULT nextval('et_proforma.payments_id_seq'::regclass);


--
-- Name: productPrices id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."productPrices" ALTER COLUMN id SET DEFAULT nextval('et_proforma."productPrices_id_seq"'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.products ALTER COLUMN id SET DEFAULT nextval('et_proforma.products_id_seq'::regclass);


--
-- Name: purchaseRequests id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."purchaseRequests" ALTER COLUMN id SET DEFAULT nextval('et_proforma."purchaseRequests_id_seq"'::regclass);


--
-- Name: quotations id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.quotations ALTER COLUMN id SET DEFAULT nextval('et_proforma.quotations_id_seq'::regclass);


--
-- Name: shippings id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.shippings ALTER COLUMN id SET DEFAULT nextval('et_proforma.shippings_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.suppliers ALTER COLUMN id SET DEFAULT nextval('et_proforma.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.users ALTER COLUMN id SET DEFAULT nextval('et_proforma.users_id_seq'::regclass);


--
-- Name: verifications id; Type: DEFAULT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.verifications ALTER COLUMN id SET DEFAULT nextval('et_proforma.verifications_id_seq'::regclass);


--
-- Data for Name: PasswordResets; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma."PasswordResets" (id, "userId", token, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma."SequelizeMeta" (name) FROM stdin;
20240203112450-create-categories.js
20240203121102-create-users.js
20240203125906-create-suppliers.js
20240203125943-create-verifications.js
20240204195359-create_purchaseRequests.js
20240204195721-create_quotations.js
20240204201849-create_productPrices.js
20240204215049-create_products.js
20240205134201-create_categories.js
20240207183149-create_orders.js
20240207183446-create_orderDetails.js
20240207183643-create_notifications.js
20240207183857-create_payments.js
20240207184128-create_shippings.js
20240207215833-create_PasswordReset.js
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.categories (id, name, "createdAt", "updatedAt") FROM stdin;
1	 Electronics	2024-02-09 10:49:41.51+03	2024-02-09 10:49:41.51+03
2	 Fashion	2024-02-09 10:49:52.946+03	2024-02-09 10:49:52.946+03
3	Home & Kitchen	2024-02-09 10:50:21.542+03	2024-02-09 10:50:21.542+03
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.notifications (id, type, message, "recipientId", "timestamp", status) FROM stdin;
\.


--
-- Data for Name: orderdetails; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.orderdetails (id, "orderId", title, price, quantity, "productId", "createdAt", "updatedAt") FROM stdin;
3	3	Product A	10.99	2	1	2024-02-09 11:08:34.087237+03	2024-02-09 11:08:34.087237+03
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.orders (id, "customerId", "supplierId", "totalPrice", tax, "shippingCost", status, "createdAt", "updatedAt", "referenceNumber", "purchaseRequestId") FROM stdin;
3	1	1	100	10	5	Pending	2024-02-09 11:01:32.048907+03	2024-02-09 11:01:32.048907+03	REF123	1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.payments (id, amount, "paidAt", "paymentMethod", "userId", "orderId", status, "referenceNumber", "fullName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: productPrices; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma."productPrices" (id, "productId", price, "quotationId", status, "createdAt", "updatedAt") FROM stdin;
1	1	0	1	pending	2024-02-09 10:57:07.377+03	2024-02-09 10:57:07.378+03
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.products (id, "purchaseRequestId", title, "Description", code, manufacturer, mark, model, "partNumber", quantity, uom, "createdAt", "updatedAt") FROM stdin;
1	1	1	1	\N	\N	\N	\N	\N	1	\N	2024-02-09 10:57:07.356+03	2024-02-09 10:57:07.356+03
2	1	1	1	\N	\N	\N	\N	\N	1	\N	2024-02-09 10:57:07.4+03	2024-02-09 10:57:07.4+03
\.


--
-- Data for Name: purchaseRequests; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma."purchaseRequests" (id, "createdAt", "updatedAt", "userId", status, remark, "addressDetail", "estimatedDelivery", "imageUrl", "referenceNumber") FROM stdin;
1	2024-02-09 10:57:07.264+03	2024-02-09 10:57:07.264+03	1	pending	NA	NA	NA	\N	PR-20240209-230212
\.


--
-- Data for Name: quotations; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.quotations (id, "supplierId", "customerId", "shippingPrice", "createdAt", status, "purchaseRequestId", "updatedAt") FROM stdin;
1	1	1	0	2024-02-09 10:57:07.335+03	pending	1	2024-02-09 10:57:07.336+03
\.


--
-- Data for Name: shippings; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.shippings (id, "orderId", address, "userId", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.suppliers (id, name, "categoryId", "userId", "createdAt", "updatedAt") FROM stdin;
1	sami cons	1	3	2024-02-09 10:56:08.731+03	2024-02-09 10:56:08.732+03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.users (id, username, "firstName", "lastName", "phoneNumber", address, email, password, role, "createdAt", "updatedAt", status, "isVerified") FROM stdin;
1	admin	admin	admin	+251973316377	Addis Ababa	admin@gmail.com	$2b$10$qnDaW9bu6qc1hkna7.Gkh.52ZozfvP.vi8ew6QFKxe/OQpS2Kq6iC	ADMIN	2024-02-09 10:46:28.888+03	2024-02-09 10:46:28.896+03	ACTIVE	f
2	customer1	customer1	customer1	+251973316377	Addis Ababa	customer1@gmail.com	$2b$10$FxKCPHDqvBfUTbvd1orzr.ldLLsBqihahj7XUWDrxFJduZvuX28d.	ADMIN	2024-02-09 10:48:05.409+03	2024-02-09 10:48:05.411+03	ACTIVE	f
3	supplier1	sams	sams	+251973316377	Addis Ababa	supplier1@gmail.com	$2b$10$X/X/GuYIvNHPDNVlvlrTye35rfuOr8Z7.SvIz4PAJjsMTBwBuQt0S	ADMIN	2024-02-09 10:56:05.986+03	2024-02-09 10:56:05.987+03	ACTIVE	f
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: et_proforma; Owner: nilesoft
--

COPY et_proforma.verifications (id, token, "userId", "createdAt", "updatedAt") FROM stdin;
1	46ee5110f85d665102d504d09f3a1d16224944d8	1	2024-02-09 10:46:28.959+03	2024-02-09 10:46:28.959+03
2	298a8e3f475a3b5e51c22840fa710cd875872047	2	2024-02-09 10:48:05.431+03	2024-02-09 10:48:05.431+03
3	5d7decaa28f641ad5924871ebdc7192218e55fef	3	2024-02-09 10:56:06.013+03	2024-02-09 10:56:06.013+03
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.categories_id_seq', 3, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.notifications_id_seq', 1, false);


--
-- Name: orderdetails_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.orderdetails_id_seq', 3, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.orders_id_seq', 3, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.payments_id_seq', 1, false);


--
-- Name: productPrices_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma."productPrices_id_seq"', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.products_id_seq', 2, true);


--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma."purchaseRequests_id_seq"', 1, true);


--
-- Name: quotations_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.quotations_id_seq', 1, true);


--
-- Name: shippings_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.shippings_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.suppliers_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.users_id_seq', 3, true);


--
-- Name: verifications_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: nilesoft
--

SELECT pg_catalog.setval('et_proforma.verifications_id_seq', 3, true);


--
-- Name: PasswordResets PasswordResets_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."PasswordResets"
    ADD CONSTRAINT "PasswordResets_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: productPrices productPrices_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."productPrices"
    ADD CONSTRAINT "productPrices_pkey" PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: purchaseRequests purchaseRequests_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."purchaseRequests"
    ADD CONSTRAINT "purchaseRequests_pkey" PRIMARY KEY (id);


--
-- Name: quotations quotations_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT quotations_pkey PRIMARY KEY (id);


--
-- Name: shippings shippings_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT shippings_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_name_key; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT suppliers_name_key UNIQUE (name);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- Name: verifications verifications_token_key; Type: CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT verifications_token_key UNIQUE (token);


--
-- Name: notifications notifications_recipientId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.notifications
    ADD CONSTRAINT "notifications_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT "orderdetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_productId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT "orderdetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES et_proforma.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_customerId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id);


--
-- Name: orders orders_supplierId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES et_proforma.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices productPrices_quotationId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma."productPrices"
    ADD CONSTRAINT "productPrices_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES et_proforma.quotations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.products
    ADD CONSTRAINT "products_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quotations quotations_customerId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quotations quotations_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quotations quotations_supplierId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES et_proforma.suppliers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: shippings shippings_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shippings shippings_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT "shippings_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: suppliers suppliers_categoryId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT "suppliers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES et_proforma.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: suppliers suppliers_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT "suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verifications verifications_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: nilesoft
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

