--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

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

--
-- Name: et_proforma; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA et_proforma;


ALTER SCHEMA et_proforma OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: et_proforma; Owner: postgres
--

CREATE TYPE et_proforma.enum_users_role AS ENUM (
    'ADMIN',
    'CUSTOMER',
    'SUPPLIER'
);


ALTER TYPE et_proforma.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: PasswordResets; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma."PasswordResets" (
    id character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma."PasswordResets" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE et_proforma."SequelizeMeta" OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE et_proforma.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.categories_id_seq OWNED BY et_proforma.categories.id;


--
-- Name: drafts; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma.drafts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "Description" character varying(255),
    code character varying(255),
    manufacturer character varying(255),
    mark character varying(255),
    "imageUrl" text,
    model character varying(255),
    "partNumber" character varying(255),
    quantity character varying(255),
    uom character varying(255),
    attachement text,
    "deliveryDate" character varying(255),
    supplier character varying(255),
    "categoryId" integer,
    remark character varying(255),
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE et_proforma.drafts OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.drafts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.drafts_id_seq OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.drafts_id_seq OWNED BY et_proforma.drafts.id;


--
-- Name: forgotPasswords; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma."forgotPasswords" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma."forgotPasswords" OWNER TO postgres;

--
-- Name: forgotPasswords_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma."forgotPasswords_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma."forgotPasswords_id_seq" OWNER TO postgres;

--
-- Name: forgotPasswords_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma."forgotPasswords_id_seq" OWNED BY et_proforma."forgotPasswords".id;


--
-- Name: notifications; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.notifications_id_seq OWNED BY et_proforma.notifications.id;


--
-- Name: orderdetails; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.orderdetails OWNER TO postgres;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.orderdetails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.orderdetails_id_seq OWNER TO postgres;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.orderdetails_id_seq OWNED BY et_proforma.orderdetails.id;


--
-- Name: orders; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.orders_id_seq OWNED BY et_proforma.orders.id;


--
-- Name: payments; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.payments_id_seq OWNED BY et_proforma.payments.id;


--
-- Name: productPrices; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma."productPrices" OWNER TO postgres;

--
-- Name: productPrices_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma."productPrices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma."productPrices_id_seq" OWNER TO postgres;

--
-- Name: productPrices_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma."productPrices_id_seq" OWNED BY et_proforma."productPrices".id;


--
-- Name: products; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma.products (
    id integer NOT NULL,
    "purchaseRequestId" integer NOT NULL,
    title character varying(255) NOT NULL,
    "Description" character varying(255),
    code character varying(255),
    manufacturer character varying(255),
    mark character varying(255),
    "imageUrl" text,
    model character varying(255),
    "partNumber" character varying(255),
    quantity character varying(255),
    uom character varying(255),
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE et_proforma.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.products_id_seq OWNED BY et_proforma.products.id;


--
-- Name: purchaseRequests; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma."purchaseRequests" OWNER TO postgres;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma."purchaseRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma."purchaseRequests_id_seq" OWNER TO postgres;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma."purchaseRequests_id_seq" OWNED BY et_proforma."purchaseRequests".id;


--
-- Name: quotations; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.quotations OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.quotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.quotations_id_seq OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.quotations_id_seq OWNED BY et_proforma.quotations.id;


--
-- Name: shippings; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.shippings OWNER TO postgres;

--
-- Name: shippings_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.shippings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.shippings_id_seq OWNER TO postgres;

--
-- Name: shippings_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.shippings_id_seq OWNED BY et_proforma.shippings.id;


--
-- Name: suppliers; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.suppliers OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.suppliers_id_seq OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.suppliers_id_seq OWNED BY et_proforma.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: et_proforma; Owner: postgres
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


ALTER TABLE et_proforma.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.users_id_seq OWNED BY et_proforma.users.id;


--
-- Name: verifications; Type: TABLE; Schema: et_proforma; Owner: postgres
--

CREATE TABLE et_proforma.verifications (
    id integer NOT NULL,
    token character varying(255),
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE et_proforma.verifications OWNER TO postgres;

--
-- Name: verifications_id_seq; Type: SEQUENCE; Schema: et_proforma; Owner: postgres
--

CREATE SEQUENCE et_proforma.verifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE et_proforma.verifications_id_seq OWNER TO postgres;

--
-- Name: verifications_id_seq; Type: SEQUENCE OWNED BY; Schema: et_proforma; Owner: postgres
--

ALTER SEQUENCE et_proforma.verifications_id_seq OWNED BY et_proforma.verifications.id;


--
-- Name: PasswordResets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResets" (
    id character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PasswordResets" OWNER TO postgres;

--
-- Name: Products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Products" (
    id integer NOT NULL,
    "purchaseRequestId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Products" OWNER TO postgres;

--
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Products_id_seq" OWNER TO postgres;

--
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;


--
-- Name: PurchaseRequestSupplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PurchaseRequestSupplier" (
    "purchaseRequestId" integer NOT NULL,
    "supplierId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PurchaseRequestSupplier" OWNER TO postgres;

--
-- Name: PurchaseRequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PurchaseRequests" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    status character varying(255) NOT NULL,
    remark character varying(255),
    "addressDetail" character varying(255),
    "estimatedDelivery" character varying(255),
    "selectedType" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PurchaseRequests" OWNER TO postgres;

--
-- Name: PurchaseRequests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PurchaseRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PurchaseRequests_id_seq" OWNER TO postgres;

--
-- Name: PurchaseRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PurchaseRequests_id_seq" OWNED BY public."PurchaseRequests".id;


--
-- Name: Suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Suppliers" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Suppliers" OWNER TO postgres;

--
-- Name: Suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Suppliers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Suppliers_id_seq" OWNER TO postgres;

--
-- Name: Suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Suppliers_id_seq" OWNED BY public."Suppliers".id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    type character varying(255),
    message character varying(255),
    "recipientId" integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(255) DEFAULT 'NA'::character varying
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: orderdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderdetails (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    title character varying(255),
    price double precision,
    quantity integer,
    "productId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orderdetails OWNER TO postgres;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orderdetails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orderdetails_id_seq OWNER TO postgres;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orderdetails_id_seq OWNED BY public.orderdetails.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
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
    "purchaseRequestId" integer DEFAULT 1
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    amount double precision NOT NULL,
    "paidAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "paymentMethod" character varying(255),
    "userId" integer NOT NULL,
    "orderId" integer DEFAULT 1 NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    "referenceNumber" character varying(255) DEFAULT 'NA'::character varying,
    "fullName" character varying(255) NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: productPrices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productPrices" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    price double precision NOT NULL,
    "quotationId" integer NOT NULL,
    status character varying(255) DEFAULT 'wait'::character varying
);


ALTER TABLE public."productPrices" OWNER TO postgres;

--
-- Name: productPrices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productPrices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productPrices_id_seq" OWNER TO postgres;

--
-- Name: productPrices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productPrices_id_seq" OWNED BY public."productPrices".id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    "purchaseRequestId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: purchaseRequestSupplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."purchaseRequestSupplier" (
    "purchaseRequestId" integer NOT NULL,
    "supplierId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."purchaseRequestSupplier" OWNER TO postgres;

--
-- Name: purchaseRequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."purchaseRequests" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    status character varying(255) NOT NULL,
    remark character varying(255),
    "addressDetail" character varying(255),
    "estimatedDelivery" character varying(255),
    "selectedType" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."purchaseRequests" OWNER TO postgres;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."purchaseRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."purchaseRequests_id_seq" OWNER TO postgres;

--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."purchaseRequests_id_seq" OWNED BY public."purchaseRequests".id;


--
-- Name: quotations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotations (
    id integer NOT NULL,
    "supplierId" integer,
    "shippingPrice" double precision,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(255) NOT NULL,
    "purchaseRequestId" integer
);


ALTER TABLE public.quotations OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quotations_id_seq OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotations_id_seq OWNED BY public.quotations.id;


--
-- Name: shippings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shippings (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    address character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying
);


ALTER TABLE public.shippings OWNER TO postgres;

--
-- Name: shippings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shippings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shippings_id_seq OWNER TO postgres;

--
-- Name: shippings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shippings_id_seq OWNED BY public.shippings.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suppliers_id_seq OWNER TO postgres;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: categories id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.categories ALTER COLUMN id SET DEFAULT nextval('et_proforma.categories_id_seq'::regclass);


--
-- Name: drafts id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.drafts ALTER COLUMN id SET DEFAULT nextval('et_proforma.drafts_id_seq'::regclass);


--
-- Name: forgotPasswords id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."forgotPasswords" ALTER COLUMN id SET DEFAULT nextval('et_proforma."forgotPasswords_id_seq"'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.notifications ALTER COLUMN id SET DEFAULT nextval('et_proforma.notifications_id_seq'::regclass);


--
-- Name: orderdetails id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orderdetails ALTER COLUMN id SET DEFAULT nextval('et_proforma.orderdetails_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orders ALTER COLUMN id SET DEFAULT nextval('et_proforma.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.payments ALTER COLUMN id SET DEFAULT nextval('et_proforma.payments_id_seq'::regclass);


--
-- Name: productPrices id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."productPrices" ALTER COLUMN id SET DEFAULT nextval('et_proforma."productPrices_id_seq"'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.products ALTER COLUMN id SET DEFAULT nextval('et_proforma.products_id_seq'::regclass);


--
-- Name: purchaseRequests id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."purchaseRequests" ALTER COLUMN id SET DEFAULT nextval('et_proforma."purchaseRequests_id_seq"'::regclass);


--
-- Name: quotations id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.quotations ALTER COLUMN id SET DEFAULT nextval('et_proforma.quotations_id_seq'::regclass);


--
-- Name: shippings id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.shippings ALTER COLUMN id SET DEFAULT nextval('et_proforma.shippings_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.suppliers ALTER COLUMN id SET DEFAULT nextval('et_proforma.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.users ALTER COLUMN id SET DEFAULT nextval('et_proforma.users_id_seq'::regclass);


--
-- Name: verifications id; Type: DEFAULT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.verifications ALTER COLUMN id SET DEFAULT nextval('et_proforma.verifications_id_seq'::regclass);


--
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);


--
-- Name: PurchaseRequests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequests" ALTER COLUMN id SET DEFAULT nextval('public."PurchaseRequests_id_seq"'::regclass);


--
-- Name: Suppliers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Suppliers" ALTER COLUMN id SET DEFAULT nextval('public."Suppliers_id_seq"'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: orderdetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails ALTER COLUMN id SET DEFAULT nextval('public.orderdetails_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: productPrices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices" ALTER COLUMN id SET DEFAULT nextval('public."productPrices_id_seq"'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: purchaseRequests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequests" ALTER COLUMN id SET DEFAULT nextval('public."purchaseRequests_id_seq"'::regclass);


--
-- Name: quotations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations ALTER COLUMN id SET DEFAULT nextval('public.quotations_id_seq'::regclass);


--
-- Name: shippings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shippings ALTER COLUMN id SET DEFAULT nextval('public.shippings_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Data for Name: PasswordResets; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma."PasswordResets" (id, "userId", token, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
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
20240214095915-create_forgotPassword.js
20240229063300-create_draft.js
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.categories (id, name, "createdAt", "updatedAt") FROM stdin;
1	Electronics	2024-02-29 22:57:36.78556+03	2024-02-29 22:57:36.78556+03
\.


--
-- Data for Name: drafts; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.drafts (id, title, "Description", code, manufacturer, mark, "imageUrl", model, "partNumber", quantity, uom, attachement, "deliveryDate", supplier, "categoryId", remark, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: forgotPasswords; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma."forgotPasswords" (id, email, token, "expiresAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.notifications (id, specificid, type, message, "recipientId", "timestamp", status, "createdAt", "updatedAt") FROM stdin;
2	1	purchaseRequest	Purchase request notification	2	2024-02-29 23:25:36.83+03	notSeen	2024-02-29 23:25:36.831+03	2024-02-29 23:25:36.831+03
3	1	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-01 08:34:11.729+03	notSeen	2024-03-01 08:34:11.734+03	2024-03-01 08:34:11.734+03
1	1	purchaseRequest	Purchase request notification	1	2024-02-29 23:25:36.82+03	read	2024-02-29 23:25:36.821+03	2024-03-01 09:31:17.756+03
4	2	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-01 09:41:51.45+03	unread	2024-03-01 09:41:51.457+03	2024-03-01 09:41:51.457+03
5	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 10:10:43.523+03	unread	2024-03-01 10:10:43.525+03	2024-03-01 10:10:43.525+03
6	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 10:23:59.619+03	unread	2024-03-01 10:23:59.622+03	2024-03-01 10:23:59.622+03
7	1	payment	payment  notification	1	2024-03-01 10:25:49.857+03	paid	2024-03-01 10:25:49.858+03	2024-03-01 10:25:49.858+03
8	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 10:58:18.572+03	unread	2024-03-01 10:58:18.573+03	2024-03-01 10:58:18.573+03
9	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 10:58:56.94+03	unread	2024-03-01 10:58:56.94+03	2024-03-01 10:58:56.94+03
10	1	payment	payment  notification	1	2024-03-01 11:01:47.557+03	paid	2024-03-01 11:01:47.557+03	2024-03-01 11:01:47.557+03
11	2	purchaseRequest	Purchase request notification	1	2024-03-01 14:24:22.707+03	unread	2024-03-01 14:24:22.709+03	2024-03-01 14:24:22.709+03
12	2	purchaseRequest	Purchase request notification	2	2024-03-01 14:24:22.721+03	unread	2024-03-01 14:24:22.721+03	2024-03-01 14:24:22.721+03
13	3	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-01 14:28:06.538+03	unread	2024-03-01 14:28:06.539+03	2024-03-01 14:28:06.539+03
14	4	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-01 14:42:14.268+03	unread	2024-03-01 14:42:14.271+03	2024-03-01 14:42:14.271+03
15	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 15:04:08.703+03	unread	2024-03-01 15:04:08.704+03	2024-03-01 15:04:08.704+03
16	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-01 15:04:27.171+03	unread	2024-03-01 15:04:27.172+03	2024-03-01 15:04:27.172+03
17	3	purchaseRequest	Purchase request notification	1	2024-03-01 17:08:44.417+03	unread	2024-03-01 17:08:44.418+03	2024-03-01 17:08:44.418+03
18	3	purchaseRequest	Purchase request notification	2	2024-03-01 17:08:44.429+03	unread	2024-03-01 17:08:44.43+03	2024-03-01 17:08:44.43+03
19	5	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-01 17:10:02.961+03	unread	2024-03-01 17:10:02.962+03	2024-03-01 17:10:02.962+03
20	6	payment	payment	3	2024-03-02 09:08:25.936+03	paid	2024-03-02 09:08:25.937+03	2024-03-02 09:08:25.937+03
21	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-02 15:03:10.213+03	unread	2024-03-02 15:03:10.216+03	2024-03-02 15:03:10.216+03
22	4	purchaseRequest	Purchase request notification	1	2024-03-02 17:29:45.99+03	unread	2024-03-02 17:29:45.992+03	2024-03-02 17:29:45.992+03
23	4	purchaseRequest	Purchase request notification	2	2024-03-02 17:29:46.001+03	unread	2024-03-02 17:29:46.001+03	2024-03-02 17:29:46.001+03
24	5	purchaseRequest	Purchase request notification	1	2024-03-02 18:34:24.323+03	unread	2024-03-02 18:34:24.324+03	2024-03-02 18:34:24.324+03
25	5	purchaseRequest	Purchase request notification	2	2024-03-02 18:34:24.334+03	unread	2024-03-02 18:34:24.335+03	2024-03-02 18:34:24.335+03
26	6	purchaseRequest	Purchase request notification	1	2024-03-02 18:39:18.021+03	unread	2024-03-02 18:39:18.022+03	2024-03-02 18:39:18.022+03
27	6	purchaseRequest	Purchase request notification	2	2024-03-02 18:39:18.03+03	unread	2024-03-02 18:39:18.031+03	2024-03-02 18:39:18.031+03
28	11	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-03 14:48:00.779+03	unread	2024-03-03 14:48:00.79+03	2024-03-03 14:48:00.79+03
29	9	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 10:58:25.007+03	unread	2024-03-04 10:58:25.01+03	2024-03-04 10:58:25.01+03
30	9	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:18:40.176+03	unread	2024-03-04 11:18:40.18+03	2024-03-04 11:18:40.18+03
31	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:19:39.418+03	unread	2024-03-04 11:19:39.419+03	2024-03-04 11:19:39.419+03
32	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:21:04.193+03	unread	2024-03-04 11:21:04.199+03	2024-03-04 11:21:04.199+03
33	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:22:39.915+03	unread	2024-03-04 11:22:39.919+03	2024-03-04 11:22:39.919+03
34	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:23:59.728+03	unread	2024-03-04 11:23:59.729+03	2024-03-04 11:23:59.729+03
35	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:28:52.99+03	unread	2024-03-04 11:28:52.996+03	2024-03-04 11:28:52.996+03
36	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:30:21.611+03	unread	2024-03-04 11:30:21.616+03	2024-03-04 11:30:21.616+03
37	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:46:42.325+03	unread	2024-03-04 11:46:42.33+03	2024-03-04 11:46:42.33+03
38	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:52:31.972+03	unread	2024-03-04 11:52:31.977+03	2024-03-04 11:52:31.977+03
39	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:56:56.202+03	unread	2024-03-04 11:56:56.203+03	2024-03-04 11:56:56.203+03
40	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:57:39.282+03	unread	2024-03-04 11:57:39.282+03	2024-03-04 11:57:39.282+03
41	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:58:21.782+03	unread	2024-03-04 11:58:21.788+03	2024-03-04 11:58:21.788+03
42	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 11:58:52.707+03	unread	2024-03-04 11:58:52.708+03	2024-03-04 11:58:52.708+03
43	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:00:32.548+03	unread	2024-03-04 12:00:32.552+03	2024-03-04 12:00:32.552+03
44	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:03:29.91+03	unread	2024-03-04 12:03:29.915+03	2024-03-04 12:03:29.915+03
45	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:05:39.425+03	unread	2024-03-04 12:05:39.43+03	2024-03-04 12:05:39.43+03
46	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:06:19.488+03	unread	2024-03-04 12:06:19.49+03	2024-03-04 12:06:19.49+03
47	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:07:51.688+03	unread	2024-03-04 12:07:51.693+03	2024-03-04 12:07:51.693+03
48	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:11:49.892+03	unread	2024-03-04 12:11:49.896+03	2024-03-04 12:11:49.896+03
49	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:12:01.142+03	unread	2024-03-04 12:12:01.142+03	2024-03-04 12:12:01.142+03
50	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:13:25.67+03	unread	2024-03-04 12:13:25.674+03	2024-03-04 12:13:25.674+03
51	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:14:11.114+03	unread	2024-03-04 12:14:11.119+03	2024-03-04 12:14:11.119+03
54	7	purchaseRequest	Purchase request notification	2	2024-03-04 12:16:18.5+03	unread	2024-03-04 12:16:18.5+03	2024-03-04 12:16:18.5+03
55	8	purchaseRequest	Purchase request notification	1	2024-03-04 12:16:28.397+03	unread	2024-03-04 12:16:28.398+03	2024-03-04 12:16:28.398+03
56	8	purchaseRequest	Purchase request notification	2	2024-03-04 12:16:28.408+03	unread	2024-03-04 12:16:28.409+03	2024-03-04 12:16:28.409+03
58	9	purchaseRequest	Purchase request notification	2	2024-03-04 12:16:56.989+03	unread	2024-03-04 12:16:56.989+03	2024-03-04 12:16:56.989+03
60	10	purchaseRequest	Purchase request notification	2	2024-03-04 12:40:10.762+03	unread	2024-03-04 12:40:10.763+03	2024-03-04 12:40:10.763+03
62	19	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:49:59.792+03	unread	2024-03-04 12:49:59.799+03	2024-03-04 12:49:59.799+03
63	19	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:51:46.949+03	unread	2024-03-04 12:51:46.954+03	2024-03-04 12:51:46.954+03
64	19	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:52:20.125+03	unread	2024-03-04 12:52:20.126+03	2024-03-04 12:52:20.126+03
53	7	purchaseRequest	Purchase request notification	1	2024-03-04 12:16:18.487+03	read	2024-03-04 12:16:18.489+03	2024-03-05 08:14:39.336+03
59	10	purchaseRequest	Purchase request notification	1	2024-03-04 12:40:10.649+03	read	2024-03-04 12:40:10.65+03	2024-03-05 08:34:09.445+03
57	9	purchaseRequest	Purchase request notification	1	2024-03-04 12:16:56.978+03	read	2024-03-04 12:16:56.979+03	2024-03-05 08:34:12.05+03
61	19	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:40:58.942+03	read	2024-03-04 12:40:58.943+03	2024-03-05 10:44:28.769+03
68	11	purchaseRequest	Purchase request notification	2	2024-03-04 22:46:16.661+03	unread	2024-03-04 22:46:16.661+03	2024-03-04 22:46:16.661+03
69	12	purchaseRequest	Purchase request notification	1	2024-03-04 23:32:16.08+03	unread	2024-03-04 23:32:16.082+03	2024-03-04 23:32:16.082+03
70	12	purchaseRequest	Purchase request notification	2	2024-03-04 23:32:16.091+03	unread	2024-03-04 23:32:16.092+03	2024-03-04 23:32:16.092+03
71	13	purchaseRequest	Purchase request notification	1	2024-03-04 23:53:57.103+03	unread	2024-03-04 23:53:57.106+03	2024-03-04 23:53:57.106+03
72	13	purchaseRequest	Purchase request notification	2	2024-03-04 23:53:57.115+03	unread	2024-03-04 23:53:57.116+03	2024-03-04 23:53:57.116+03
74	14	purchaseRequest	Purchase request notification	2	2024-03-05 00:00:54.751+03	unread	2024-03-05 00:00:54.751+03	2024-03-05 00:00:54.751+03
76	15	purchaseRequest	Purchase request notification	2	2024-03-05 00:46:46.432+03	unread	2024-03-05 00:46:46.432+03	2024-03-05 00:46:46.432+03
78	18	purchaseRequest	Purchase request notification	2	2024-03-05 00:52:44.772+03	unread	2024-03-05 00:52:44.772+03	2024-03-05 00:52:44.772+03
80	20	purchaseRequest	Purchase request notification	2	2024-03-05 00:57:03.076+03	unread	2024-03-05 00:57:03.077+03	2024-03-05 00:57:03.077+03
82	23	purchaseRequest	Purchase request notification	2	2024-03-05 07:23:28.085+03	unread	2024-03-05 07:23:28.086+03	2024-03-05 07:23:28.086+03
86	25	purchaseRequest	Purchase request notification	2	2024-03-05 07:24:31.361+03	unread	2024-03-05 07:24:31.361+03	2024-03-05 07:24:31.361+03
52	7	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:14:25.042+03	read	2024-03-04 12:14:25.042+03	2024-03-05 07:53:38.405+03
88	26	purchaseRequest	Purchase request notification	2	2024-03-05 07:25:42.033+03	read	2024-03-05 07:25:42.034+03	2024-03-05 08:30:52.911+03
84	24	purchaseRequest	Purchase request notification	2	2024-03-05 07:23:49.161+03	read	2024-03-05 07:23:49.162+03	2024-03-05 08:31:51.423+03
87	26	purchaseRequest	Purchase request notification	1	2024-03-05 07:25:42.022+03	read	2024-03-05 07:25:42.023+03	2024-03-05 08:32:51.992+03
85	25	purchaseRequest	Purchase request notification	1	2024-03-05 07:24:31.344+03	read	2024-03-05 07:24:31.345+03	2024-03-05 08:33:47.336+03
83	24	purchaseRequest	Purchase request notification	1	2024-03-05 07:23:49.146+03	read	2024-03-05 07:23:49.148+03	2024-03-05 08:33:59.19+03
81	23	purchaseRequest	Purchase request notification	1	2024-03-05 07:23:28.074+03	read	2024-03-05 07:23:28.075+03	2024-03-05 08:34:01.001+03
77	18	purchaseRequest	Purchase request notification	1	2024-03-05 00:52:44.757+03	read	2024-03-05 00:52:44.758+03	2024-03-05 08:34:03.695+03
67	11	purchaseRequest	Purchase request notification	1	2024-03-04 22:46:16.648+03	read	2024-03-04 22:46:16.649+03	2024-03-05 08:34:06.214+03
79	20	purchaseRequest	Purchase request notification	1	2024-03-05 00:57:03.062+03	read	2024-03-05 00:57:03.064+03	2024-03-05 08:37:13.794+03
75	15	purchaseRequest	Purchase request notification	1	2024-03-05 00:46:46.419+03	read	2024-03-05 00:46:46.42+03	2024-03-05 08:37:31.886+03
73	14	purchaseRequest	Purchase request notification	1	2024-03-05 00:00:54.739+03	read	2024-03-05 00:00:54.74+03	2024-03-05 08:56:23.331+03
66	20	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 14:42:52.6+03	read	2024-03-04 14:42:52.611+03	2024-03-05 10:42:48.904+03
65	19	rfq	RFQ received. Price details enclosed. Thank you.	3	2024-03-04 12:53:17.987+03	read	2024-03-04 12:53:17.988+03	2024-03-05 10:42:50.235+03
89	1	updateOrder	Supplier Comfirm Your Order 	3	2024-03-05 08:58:18.443+03	read	2024-03-05 08:58:18.445+03	2024-03-05 10:44:10.099+03
90	6	updateOrder	Supplier Comfirm Your Order 	3	2024-03-05 10:47:49.679+03	unread	2024-03-05 10:47:49.682+03	2024-03-05 10:47:49.682+03
91	7	payment	payment	3	2024-03-05 10:53:27.195+03	paid	2024-03-05 10:53:27.196+03	2024-03-05 10:53:27.196+03
92	7	updateOrder	Supplier Comfirm Your Order 	3	2024-03-05 11:32:40.734+03	unread	2024-03-05 11:32:40.735+03	2024-03-05 11:32:40.735+03
93	7	updateOrder	Supplier Comfirm Your Order 	3	2024-03-05 11:33:21.348+03	unread	2024-03-05 11:33:21.348+03	2024-03-05 11:33:21.348+03
94	9	order	Customer Send Order to supplier	1	2024-03-05 11:58:07.236+03	read	2024-03-05 11:58:07.238+03	2024-03-05 12:03:01.936+03
95	9	updateOrder	Supplier Comfirm Your Order 	3	2024-03-05 13:13:31.348+03	unread	2024-03-05 13:13:31.35+03	2024-03-05 13:13:31.35+03
\.


--
-- Data for Name: orderdetails; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.orderdetails (id, "orderId", title, price, quantity, "productId", "createdAt", "updatedAt") FROM stdin;
1	1	p1	5000	11	1	2024-03-01 09:43:53.111+03	2024-03-01 09:43:53.113+03
2	2	p1	7000	11	1	2024-03-01 10:57:43.862+03	2024-03-01 10:57:43.864+03
3	3	44	1200	44	2	2024-03-01 15:03:38.583+03	2024-03-01 15:03:38.586+03
4	4	44	9999	44	2	2024-03-01 15:05:40.835+03	2024-03-01 15:05:40.835+03
5	5	tt	555555	44	3	2024-03-02 13:27:59.887+03	2024-03-02 13:27:59.889+03
6	6	ee	10	22	6	2024-03-04 10:36:46.515+03	2024-03-04 10:36:46.517+03
7	7	rr	3	44	10	2024-03-05 11:29:49.681+03	2024-03-05 11:29:49.684+03
8	8	rr	9000	44	10	2024-03-05 11:41:20.11+03	2024-03-05 11:41:20.11+03
9	9	p1	50	111	5	2024-03-05 11:58:07.157+03	2024-03-05 11:58:07.159+03
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.orders (id, "customerId", "supplierId", "totalPrice", tax, "shippingCost", status, "createdAt", "updatedAt", "referenceNumber", "purchaseRequestId") FROM stdin;
1	3	1	55000	8250	500	paid	2024-03-01 09:43:53.064+03	2024-03-01 10:25:49.839+03	NA	1
2	3	2	77000	11550	500	paid	2024-03-01 10:57:43.812+03	2024-03-01 11:01:47.542+03	NA	1
4	3	2	439956	65993.4	500	pending	2024-03-01 15:05:40.813+03	2024-03-01 15:05:40.814+03	NA	1
3	3	1	52800	7920	500	paid	2024-03-01 15:03:38.525+03	2024-03-02 09:08:25.88+03	NA	1
5	3	1	24444420	3666663	500	reject	2024-03-02 13:27:59.809+03	2024-03-02 15:03:10.188+03	NA	1
6	3	1	220	33	500	paid	2024-03-04 10:36:46.399+03	2024-03-05 10:53:27.132+03	NA	1
7	3	1	132	19.8	500	approved	2024-03-05 11:29:49.657+03	2024-03-05 11:33:21.285+03	NA	1
8	3	2	396000	59400	500	pending	2024-03-05 11:41:20.087+03	2024-03-05 11:41:20.088+03	NA	1
9	3	1	5550	832.5	500	comformed	2024-03-05 11:58:07.08+03	2024-03-05 13:13:31.305+03	NA	1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.payments (id, amount, "paidAt", "paymentMethod", "userId", "orderId", status, "referenceNumber", "fullName", "createdAt", "updatedAt") FROM stdin;
4	63750	2024-01-02 03:00:00+03	Tele Birr	3	1	paid	7p7po	samson mamushet	2024-03-01 10:25:49.803+03	2024-03-01 10:25:49.803+03
5	89050	2024-01-03 03:00:00+03	Tele Birr	3	2	paid	opop	yosis	2024-03-01 11:01:47.505+03	2024-03-01 11:01:47.505+03
6	61220	2024-01-01 03:00:00+03	Tele Birr	3	3	paid	yosis	yosis	2024-03-02 09:08:25.756+03	2024-03-02 09:08:25.756+03
7	753	2024-01-01 03:00:00+03	Tele Birr	3	6	paid	babamaim	baba	2024-03-05 10:53:27.028+03	2024-03-05 10:53:27.028+03
\.


--
-- Data for Name: productPrices; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma."productPrices" (id, "productId", price, "quotationId", status, "createdAt", "updatedAt", "disCountPrice") FROM stdin;
1	1	5000	1	ordered	2024-02-29 23:25:36.864+03	2024-03-01 09:43:53.16+03	\N
2	1	7000	2	ordered	2024-02-29 23:25:36.875+03	2024-03-01 10:57:43.896+03	\N
3	2	1200	3	ordered	2024-03-01 14:24:22.754+03	2024-03-01 15:03:38.642+03	\N
4	2	9999	4	ordered	2024-03-01 14:24:22.76+03	2024-03-01 15:05:40.861+03	\N
6	3	0	6	pending	2024-03-01 17:08:44.465+03	2024-03-01 17:08:44.465+03	\N
5	3	555555	5	ordered	2024-03-01 17:08:44.457+03	2024-03-02 13:27:59.913+03	\N
8	4	0	8	pending	2024-03-02 17:29:46.046+03	2024-03-02 17:29:46.046+03	\N
10	5	0	10	pending	2024-03-02 18:34:24.403+03	2024-03-02 18:34:24.403+03	\N
12	6	0	12	pending	2024-03-02 18:39:18.085+03	2024-03-02 18:39:18.085+03	\N
11	6	10	11	ordered	2024-03-02 18:39:18.077+03	2024-03-04 10:36:46.545+03	\N
7	4	44	7	pending	2024-03-02 17:29:46.04+03	2024-03-04 11:30:21.708+03	55
15	11	0	21	pending	2024-03-04 22:46:16.692+03	2024-03-04 22:46:16.692+03	\N
16	11	0	22	pending	2024-03-04 22:46:16.703+03	2024-03-04 22:46:16.703+03	\N
17	12	0	23	pending	2024-03-04 23:32:16.132+03	2024-03-04 23:32:16.132+03	\N
18	13	0	25	pending	2024-03-04 23:53:57.159+03	2024-03-04 23:53:57.159+03	\N
19	14	0	27	pending	2024-03-05 00:00:54.783+03	2024-03-05 00:00:54.783+03	\N
20	14	0	28	pending	2024-03-05 00:00:54.789+03	2024-03-05 00:00:54.789+03	\N
21	18	0	31	pending	2024-03-05 00:52:44.826+03	2024-03-05 00:52:44.826+03	\N
22	18	0	32	pending	2024-03-05 00:52:44.842+03	2024-03-05 00:52:44.842+03	\N
23	20	0	33	pending	2024-03-05 00:57:03.121+03	2024-03-05 00:57:03.121+03	\N
24	20	0	34	pending	2024-03-05 00:57:03.134+03	2024-03-05 00:57:03.134+03	\N
25	23	0	35	pending	2024-03-05 07:23:28.141+03	2024-03-05 07:23:28.141+03	\N
26	23	0	36	pending	2024-03-05 07:23:28.154+03	2024-03-05 07:23:28.154+03	\N
27	24	0	37	pending	2024-03-05 07:23:49.201+03	2024-03-05 07:23:49.201+03	\N
28	24	0	38	pending	2024-03-05 07:23:49.211+03	2024-03-05 07:23:49.211+03	\N
29	25	0	39	pending	2024-03-05 07:24:31.4+03	2024-03-05 07:24:31.4+03	\N
30	25	0	40	pending	2024-03-05 07:24:31.409+03	2024-03-05 07:24:31.409+03	\N
31	26	0	41	pending	2024-03-05 07:25:42.071+03	2024-03-05 07:25:42.071+03	\N
32	26	0	42	pending	2024-03-05 07:25:42.077+03	2024-03-05 07:25:42.077+03	\N
13	10	3	19	ordered	2024-03-04 12:40:10.813+03	2024-03-05 11:29:49.775+03	33
14	10	9000	20	ordered	2024-03-04 12:40:10.834+03	2024-03-05 11:41:20.125+03	200
9	5	50	9	ordered	2024-03-02 18:34:24.39+03	2024-03-05 11:58:07.256+03	\N
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.products (id, "purchaseRequestId", title, "Description", code, manufacturer, mark, "imageUrl", model, "partNumber", quantity, uom, "createdAt", "updatedAt") FROM stdin;
1	1	p1		p1			\N		p1	11	p1	2024-02-29 23:25:36.754+03	2024-02-29 23:25:36.754+03
2	2	44		44			\N		44	44	44	2024-03-01 14:24:22.599+03	2024-03-01 14:24:22.599+03
3	3	tt		tt			\N		tt	44	tt	2024-03-01 17:08:44.375+03	2024-03-01 17:08:44.375+03
4	4	qq		qq			\N		qq	44	qq	2024-03-02 17:29:45.881+03	2024-03-02 17:29:45.881+03
5	5	p1	p1	p1	p1	p1	\N	p1	p1	111	p1	2024-03-02 18:34:24.249+03	2024-03-02 18:34:24.249+03
6	6	ee	ee	eee	ee	ee	\N	eee	ee	22	eee	2024-03-02 18:39:17.983+03	2024-03-02 18:39:17.983+03
7	7	rr		rr			\N		rr	44	rr	2024-03-04 12:16:18.431+03	2024-03-04 12:16:18.431+03
8	8	rr		rr			\N		rr	44	rr	2024-03-04 12:16:28.364+03	2024-03-04 12:16:28.364+03
9	9	rr		rr			\N		rr	44	rr	2024-03-04 12:16:56.891+03	2024-03-04 12:16:56.891+03
10	10	rr		rr			\N		rr	44	rr	2024-03-04 12:40:10.575+03	2024-03-04 12:40:10.575+03
11	11	dd		dd			\N		dd	33	dd	2024-03-04 22:46:16.607+03	2024-03-04 22:46:16.607+03
12	12	ee		ee			\N		ee	33	uu	2024-03-04 23:32:16.002+03	2024-03-04 23:32:16.002+03
13	13	ee		ee			\N		ee	33	uu	2024-03-04 23:53:57.042+03	2024-03-04 23:53:57.042+03
14	14	ee		ee			\N		ee	33	uu	2024-03-05 00:00:54.684+03	2024-03-05 00:00:54.684+03
15	15	ss		ss			\N		ee	33	ee	2024-03-05 00:46:46.356+03	2024-03-05 00:46:46.356+03
16	16	ss		ss			\N		ee	33	ee	2024-03-05 00:46:51.162+03	2024-03-05 00:46:51.162+03
17	17	ss		ss			\N		ee	33	ee	2024-03-05 00:48:58.308+03	2024-03-05 00:48:58.308+03
18	18	ss		ss			\N		ee	33	ee	2024-03-05 00:52:44.688+03	2024-03-05 00:52:44.688+03
19	19	ss		ss			\N		ee	33	ee	2024-03-05 00:53:08.964+03	2024-03-05 00:53:08.964+03
20	20	ss		ss			\N		ee	33	ee	2024-03-05 00:57:02.996+03	2024-03-05 00:57:02.996+03
21	21	ss		ss			\N		ee	33	ee	2024-03-05 00:57:14.925+03	2024-03-05 00:57:14.925+03
22	22	ss		ss			\N		ee	33	ee	2024-03-05 07:21:11.23+03	2024-03-05 07:21:11.23+03
23	23	ss		ss			\N		ee	33	ee	2024-03-05 07:23:27.997+03	2024-03-05 07:23:27.997+03
24	24	ss		ss			\N		ee	33	ee	2024-03-05 07:23:49.084+03	2024-03-05 07:23:49.084+03
25	25	ss		ss			\N		ee	33	ee	2024-03-05 07:24:31.246+03	2024-03-05 07:24:31.246+03
26	26	xc		cc			\N		ccc	52	ccc	2024-03-05 07:25:41.975+03	2024-03-05 07:25:41.975+03
\.


--
-- Data for Name: purchaseRequests; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma."purchaseRequests" (id, "createdAt", "categoryId", "updatedAt", "userId", status, remark, "addressDetail", "estimatedDelivery", "imageUrl", "referenceNumber") FROM stdin;
1	2024-02-29 23:25:36.719+03	1	2024-02-29 23:25:36.719+03	3	pending	ok			\N	PR-20240229-584438
2	2024-03-01 14:24:22.499+03	1	2024-03-01 14:24:22.499+03	3	pending	44	44	20	\N	PR-20240301-444375
3	2024-03-01 17:08:44.288+03	1	2024-03-01 17:08:44.288+03	3	pending	ff	ff	18	\N	PR-20240301-394097
4	2024-03-02 17:29:45.776+03	1	2024-03-02 17:29:45.776+03	3	pending	qqq	qqq	14	\N	PR-20240302-350578
5	2024-03-02 18:34:24.137+03	1	2024-03-02 18:34:24.137+03	3	pending	ok	p1	19	\N	PR-20240302-6820
6	2024-03-02 18:39:17.946+03	1	2024-03-02 18:39:17.946+03	3	pending	ok	ok	12	\N	PR-20240302-339559
7	2024-03-04 12:16:18.363+03	1	2024-03-04 12:16:18.363+03	3	pending	ff	ff	20	\N	PR-20240304-679172
8	2024-03-04 12:16:28.333+03	1	2024-03-04 12:16:28.333+03	3	pending	ff	ff	20	\N	PR-20240304-589800
9	2024-03-04 12:16:56.819+03	1	2024-03-04 12:16:56.819+03	3	pending	ff	ff	20	\N	PR-20240304-434669
10	2024-03-04 12:40:10.503+03	1	2024-03-04 12:40:10.503+03	3	pending	ff	ff	20	\N	PR-20240304-814759
11	2024-03-04 22:46:16.563+03	1	2024-03-04 22:46:16.563+03	3	pending	ok	rr	10	\N	PR-20240304-273391
12	2024-03-04 23:32:15.885+03	1	2024-03-04 23:32:15.885+03	3	pending	ok	ok	13	\N	PR-20240304-179720
13	2024-03-04 23:53:56.974+03	1	2024-03-04 23:53:56.974+03	3	pending	ok	ok	13	\N	PR-20240304-648417
14	2024-03-05 00:00:54.635+03	1	2024-03-05 00:00:54.635+03	3	pending	ok	ok	13	\N	PR-20240304-913360
15	2024-03-05 00:46:46.304+03	1	2024-03-05 00:46:46.304+03	3	pending	xx	xx	11	\N	PR-20240304-690812
16	2024-03-05 00:46:51.141+03	1	2024-03-05 00:46:51.141+03	3	pending	xx	xx	11	\N	PR-20240304-972077
17	2024-03-05 00:48:58.284+03	1	2024-03-05 00:48:58.284+03	3	pending	xx	xx	11	\N	PR-20240304-406887
18	2024-03-05 00:52:44.643+03	1	2024-03-05 00:52:44.643+03	3	pending	xx	xx	11	\N	PR-20240304-282592
19	2024-03-05 00:53:08.939+03	1	2024-03-05 00:53:08.939+03	3	pending	xx	xx	11	\N	PR-20240304-658936
20	2024-03-05 00:57:02.945+03	1	2024-03-05 00:57:02.945+03	3	pending	xx	xx	11	\N	PR-20240304-909342
21	2024-03-05 00:57:14.907+03	1	2024-03-05 00:57:14.907+03	3	pending	xx	xx	11	\N	PR-20240304-375860
22	2024-03-05 07:21:11.119+03	1	2024-03-05 07:21:11.119+03	3	pending	xx	xx	11	\N	PR-20240305-781421
23	2024-03-05 07:23:27.658+03	1	2024-03-05 07:23:27.658+03	3	pending	xx	xx	11	\N	PR-20240305-325368
24	2024-03-05 07:23:49.056+03	1	2024-03-05 07:23:49.056+03	3	pending	xx	xx	11	\N	PR-20240305-139223
25	2024-03-05 07:24:31.039+03	1	2024-03-05 07:24:31.039+03	3	pending	xx	xx	11	\N	PR-20240305-261357
26	2024-03-05 07:25:41.907+03	1	2024-03-05 07:25:41.907+03	3	pending	cd	ok	11	\N	PR-20240305-398544
\.


--
-- Data for Name: quotations; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.quotations (id, "supplierId", "customerId", "shippingPrice", "createdAt", status, "purchaseRequestId", "updatedAt", "otherPayment", "availabilityDate") FROM stdin;
1	1	3	500	2024-02-29 23:25:36.789+03	quoted	1	2024-03-01 08:34:11.85+03	\N	\N
2	2	3	700	2024-02-29 23:25:36.792+03	quoted	1	2024-03-01 09:41:51.538+03	\N	\N
3	1	3	45	2024-03-01 14:24:22.671+03	quoted	2	2024-03-01 14:28:06.585+03	\N	\N
4	2	3	999	2024-03-01 14:24:22.675+03	quoted	2	2024-03-01 14:42:14.314+03	\N	\N
6	2	3	0	2024-03-01 17:08:44.397+03	pending	3	2024-03-01 17:08:44.398+03	\N	\N
5	1	3	1111	2024-03-01 17:08:44.395+03	quoted	3	2024-03-01 17:10:03.021+03	\N	\N
8	2	3	0	2024-03-02 17:29:45.969+03	pending	4	2024-03-02 17:29:45.97+03	\N	\N
10	2	3	0	2024-03-02 18:34:24.287+03	pending	5	2024-03-02 18:34:24.288+03	\N	\N
12	2	3	0	2024-03-02 18:39:17.996+03	pending	6	2024-03-02 18:39:17.996+03	\N	\N
11	1	3	100	2024-03-02 18:39:17.995+03	quoted	6	2024-03-03 14:48:01.016+03	\N	\N
9	1	3	50	2024-03-02 18:34:24.285+03	quoted	5	2024-03-04 11:18:40.265+03	\N	\N
7	1	3	34	2024-03-02 17:29:45.968+03	quoted	4	2024-03-04 11:30:21.73+03	\N	\N
13	1	3	0	2024-03-04 12:16:18.455+03	pending	7	2024-03-04 12:16:18.456+03	\N	\N
14	2	3	0	2024-03-04 12:16:18.457+03	pending	7	2024-03-04 12:16:18.457+03	\N	\N
15	1	3	0	2024-03-04 12:16:28.376+03	pending	8	2024-03-04 12:16:28.377+03	\N	\N
16	2	3	0	2024-03-04 12:16:28.378+03	pending	8	2024-03-04 12:16:28.378+03	\N	\N
17	1	3	0	2024-03-04 12:16:56.948+03	pending	9	2024-03-04 12:16:56.949+03	\N	\N
18	2	3	0	2024-03-04 12:16:56.95+03	pending	9	2024-03-04 12:16:56.95+03	\N	\N
19	1	3	33	2024-03-04 12:40:10.597+03	quoted	10	2024-03-04 12:53:18.049+03	33	13
20	2	3	200	2024-03-04 12:40:10.599+03	quoted	10	2024-03-04 14:42:52.698+03	200	22
21	1	3	0	2024-03-04 22:46:16.626+03	pending	11	2024-03-04 22:46:16.627+03	\N	\N
22	2	3	0	2024-03-04 22:46:16.628+03	pending	11	2024-03-04 22:46:16.629+03	\N	\N
23	1	3	0	2024-03-04 23:32:16.049+03	pending	12	2024-03-04 23:32:16.05+03	\N	\N
24	2	3	0	2024-03-04 23:32:16.051+03	pending	12	2024-03-04 23:32:16.051+03	\N	\N
25	1	3	0	2024-03-04 23:53:57.07+03	pending	13	2024-03-04 23:53:57.071+03	\N	\N
26	2	3	0	2024-03-04 23:53:57.072+03	pending	13	2024-03-04 23:53:57.073+03	\N	\N
27	1	3	0	2024-03-05 00:00:54.707+03	pending	14	2024-03-05 00:00:54.708+03	\N	\N
28	2	3	0	2024-03-05 00:00:54.708+03	pending	14	2024-03-05 00:00:54.709+03	\N	\N
29	1	3	0	2024-03-05 00:46:46.389+03	pending	15	2024-03-05 00:46:46.39+03	\N	\N
30	2	3	0	2024-03-05 00:46:46.39+03	pending	15	2024-03-05 00:46:46.391+03	\N	\N
31	1	3	0	2024-03-05 00:52:44.724+03	pending	18	2024-03-05 00:52:44.725+03	\N	\N
32	2	3	0	2024-03-05 00:52:44.727+03	pending	18	2024-03-05 00:52:44.727+03	\N	\N
33	1	3	0	2024-03-05 00:57:03.028+03	pending	20	2024-03-05 00:57:03.029+03	\N	\N
34	2	3	0	2024-03-05 00:57:03.031+03	pending	20	2024-03-05 00:57:03.031+03	\N	\N
35	1	3	0	2024-03-05 07:23:28.03+03	pending	23	2024-03-05 07:23:28.031+03	\N	\N
36	2	3	0	2024-03-05 07:23:28.033+03	pending	23	2024-03-05 07:23:28.033+03	\N	\N
37	1	3	0	2024-03-05 07:23:49.105+03	pending	24	2024-03-05 07:23:49.105+03	\N	\N
38	2	3	0	2024-03-05 07:23:49.105+03	pending	24	2024-03-05 07:23:49.106+03	\N	\N
39	1	3	0	2024-03-05 07:24:31.275+03	pending	25	2024-03-05 07:24:31.277+03	\N	\N
40	2	3	0	2024-03-05 07:24:31.277+03	pending	25	2024-03-05 07:24:31.278+03	\N	\N
41	1	3	0	2024-03-05 07:25:41.997+03	pending	26	2024-03-05 07:25:41.998+03	\N	\N
42	2	3	0	2024-03-05 07:25:41.999+03	pending	26	2024-03-05 07:25:41.999+03	\N	\N
\.


--
-- Data for Name: shippings; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.shippings (id, "orderId", address, "userId", status, "createdAt", "updatedAt") FROM stdin;
1	3	samisams eko	3	In Transit	2024-03-02 09:08:25.904+03	2024-03-02 09:08:25.904+03
2	6	samisams eko	3	In Transit	2024-03-05 10:53:27.15+03	2024-03-05 10:53:27.15+03
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.suppliers (id, name, "categoryId", "userId", email, address, phonenumber, "createdAt", "updatedAt", country, city, "houseNumber", "contactNumber", "specificName", "subCity", "isVerified") FROM stdin;
1	fasileserte77@gmail.com	1	1	\N	\N	\N	2024-02-29 23:03:18.018+03	2024-02-29 23:03:18.018+03	\N	\N	\N	\N	\N	\N	\N
2	abc	1	2	\N	\N	\N	2024-02-29 23:22:05.016+03	2024-02-29 23:22:05.017+03	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.users (id, username, "firstName", "lastName", "phoneNumber", address, email, password, role, "createdAt", "updatedAt", status, "isVerified", profilepicture) FROM stdin;
1	supplier1	supplier1	supplier1	0973316377	EthiopiaAddis Ababa	fasileserte77@gmail.com	$2b$10$5tGeeBOV4r6RheXI9cN2Zu2bb71gGaLS2603aW4Tehr7QAHJ/.vue	SUPPLIER	2024-02-29 23:03:09.713+03	2024-02-29 23:03:09.72+03	ACTIVE	f	\N
2	supplier2	supplier2	supplier2	0973316377	EthiopiaAddis Ababa	forsamisams@gmail.com	$2b$10$mZp8SuPxke73doYzQt7d1.ups9RwCPIeq8rex6g2ZEh.Nz1d.aSe2	SUPPLIER	2024-02-29 23:22:00.397+03	2024-02-29 23:22:00.399+03	ACTIVE	f	\N
3	customer1	samisams	samisams	0973316377	EthiopiaAddis Ababa	samsonmamushet3@gmail.com	$2b$10$4NzeFufWOqGVTDsyb0pH6uIW.G7bbS8lNvN2EOoMuRamJBOstTvHa	CUSTOMER	2024-02-29 23:24:24.516+03	2024-02-29 23:24:24.517+03	ACTIVE	f	\N
4	admin	admin 	abab	0973316377	EthiopiaAddis Ababa	gashesami@gmail.com	$2b$10$OTMTog6wjHm2OpUXxWtGWu6f8Syp.LkP/D4E47u2Q.xsANOWRoan6	ADMIN	2024-03-01 10:14:41.167+03	2024-03-01 10:14:41.173+03	ACTIVE	f	\N
5	eten	eten	eten	0973316377	EthiopiaAddis Ababa	eten@gmail.com	$2b$10$ggI8UiPlrlQk/uqL0TWnueS9g9zObSYm4uzm0qB1pMPicC4hwzHjm	CUSTOMER	2024-03-02 09:28:51.362+03	2024-03-02 09:28:51.365+03	ACTIVE	f	\N
6	mm	mmm	mmm	0973316377	EthiopiaAddis Ababa	samisams2@gmail.com	$2b$10$Eha8Y8z6F7/VZvm3TJKzX.0aqzLva4Ew4ANlsd4WS7B8F3e4e.TQC	CUSTOMER	2024-03-04 21:47:08.604+03	2024-03-04 21:47:08.614+03	ACTIVE	f	\N
7	gashe	dfdf	dddd		EthiopiaAddis Ababa	samsodsdnmamushet3@gmail.com	$2b$10$O92zELK.L4i2YFxrIUYxwuD4GMxOR7TlPDXfl5J4ES4awHZw5cDCa	CUSTOMER	2024-03-04 21:49:34.138+03	2024-03-04 21:49:34.139+03	ACTIVE	f	\N
8	gashedd	dd	dd	0973316377	Ethiopia	fm@gmail.com	$2b$10$yFHiXDxTBlPK8lYVBp969eDkD1li3UisxwKseZbhR4AWSbyKLKLcC	CUSTOMER	2024-03-04 21:50:57.877+03	2024-03-04 21:50:57.879+03	ACTIVE	f	\N
9	baba	baba	baba	0973316377	Ethiopia	fo111rsamisams@gmail.com	$2b$10$RY1vQHaBkVX/aWpP8cbai.gBuys.RdZ6AnOga/xWB2EpBRNqf.NGy	CUSTOMER	2024-03-04 22:03:20.656+03	2024-03-04 22:03:20.657+03	ACTIVE	f	\N
10	gashepop	cfc	fcf	0973316377	Ethiopia	customdddder1@gmail.com	$2b$10$0htPHB4OY7Fi2kfnbR.mlekivJMxcgyQoTvh/joAnNF8DA6R7pHJa	CUSTOMER	2024-03-04 22:07:33.014+03	2024-03-04 22:07:33.015+03	ACTIVE	f	\N
12	dd	dd	dd	973316377	EthiopiaAddis Ababa	arsenalddmanci@gmail.com	$2b$10$4dYvgZ3QsDCdQHjHrVtsM.4pkKC1XnePrSLqEObCyW1j3IJB2sXiK	CUSTOMER	2024-03-04 22:30:24.884+03	2024-03-04 22:30:24.891+03	ACTIVE	f	\N
13	cdf	cdf	cdf	0973316377	EthiopiaAddis Ababa	arsenalmanci@gmail.com	$2b$10$WGb2EXlPJGbRnn8TEE5JcuSlQQdM1jh4rSsIle3vpYJ/g/jy468a2	CUSTOMER	2024-03-04 22:35:23.854+03	2024-03-04 22:35:23.867+03	ACTIVE	f	\N
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: et_proforma; Owner: postgres
--

COPY et_proforma.verifications (id, token, "userId", "createdAt", "updatedAt") FROM stdin;
1	4c0df35721cf141feace3c3c6316c34f6a6831bb	1	2024-02-29 23:03:09.804+03	2024-02-29 23:03:09.804+03
2	eac72d282022a971afd1b16386789f01f1effd0c	2	2024-02-29 23:22:00.446+03	2024-02-29 23:22:00.446+03
3	38a96c916dcdb3c6d284dadecbd7f7636814b6aa	3	2024-02-29 23:24:24.534+03	2024-02-29 23:24:24.534+03
4	d2202f29742dff33590ae339dab50322bed33072	4	2024-03-01 10:14:41.283+03	2024-03-01 10:14:41.283+03
5	02c078ee7df7bc2b65dc3a5c92814cfc35647487	5	2024-03-02 09:28:51.444+03	2024-03-02 09:28:51.444+03
6	46c5eb54f772ead3e0c29b17a527c93fd1a08c06	6	2024-03-04 21:47:08.722+03	2024-03-04 21:47:08.722+03
7	56185e60faf8a3310c81c4fe72206c6deb557b2f	7	2024-03-04 21:49:34.464+03	2024-03-04 21:49:34.464+03
8	bf84ede3784f7c2f7b5a0c3657086005761d4f3b	8	2024-03-04 21:50:57.92+03	2024-03-04 21:50:57.92+03
9	d25b8c4954c5d0810abb81edf9ed8a3039795604	9	2024-03-04 22:03:20.685+03	2024-03-04 22:03:20.685+03
10	5ccae454a7e13e5ad83f941dfbbfb8ba3af38e27	10	2024-03-04 22:07:33.041+03	2024-03-04 22:07:33.041+03
12	b61ac11194f43adfd541af7f04b91d6c8deff4ec	12	2024-03-04 22:30:24.949+03	2024-03-04 22:30:24.949+03
13	d64895c81254423ba8422317b88e262b5aaab17d	13	2024-03-04 22:35:23.934+03	2024-03-04 22:35:23.934+03
\.


--
-- Data for Name: PasswordResets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordResets" (id, "userId", token, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Products" (id, "purchaseRequestId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PurchaseRequestSupplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PurchaseRequestSupplier" ("purchaseRequestId", "supplierId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PurchaseRequests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PurchaseRequests" (id, "userId", status, remark, "addressDetail", "estimatedDelivery", "selectedType", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Suppliers" (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, type, message, "recipientId", "timestamp", status) FROM stdin;
\.


--
-- Data for Name: orderdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orderdetails (id, "orderId", title, price, quantity, "productId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "customerId", "supplierId", "totalPrice", tax, "shippingCost", status, "createdAt", "updatedAt", "referenceNumber", "purchaseRequestId") FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, amount, "paidAt", "paymentMethod", "userId", "orderId", status, "referenceNumber", "fullName") FROM stdin;
\.


--
-- Data for Name: productPrices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."productPrices" (id, "productId", price, "quotationId", status) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, "purchaseRequestId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: purchaseRequestSupplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."purchaseRequestSupplier" ("purchaseRequestId", "supplierId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: purchaseRequests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."purchaseRequests" (id, "userId", status, remark, "addressDetail", "estimatedDelivery", "selectedType", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: quotations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotations (id, "supplierId", "shippingPrice", "createdAt", status, "purchaseRequestId") FROM stdin;
\.


--
-- Data for Name: shippings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shippings (id, "orderId", address, "userId", status) FROM stdin;
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.categories_id_seq', 1, true);


--
-- Name: drafts_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.drafts_id_seq', 1, false);


--
-- Name: forgotPasswords_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma."forgotPasswords_id_seq"', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.notifications_id_seq', 95, true);


--
-- Name: orderdetails_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.orderdetails_id_seq', 9, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.orders_id_seq', 9, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.payments_id_seq', 7, true);


--
-- Name: productPrices_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma."productPrices_id_seq"', 32, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.products_id_seq', 26, true);


--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma."purchaseRequests_id_seq"', 26, true);


--
-- Name: quotations_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.quotations_id_seq', 42, true);


--
-- Name: shippings_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.shippings_id_seq', 2, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.suppliers_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.users_id_seq', 13, true);


--
-- Name: verifications_id_seq; Type: SEQUENCE SET; Schema: et_proforma; Owner: postgres
--

SELECT pg_catalog.setval('et_proforma.verifications_id_seq', 13, true);


--
-- Name: Products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Products_id_seq"', 1, false);


--
-- Name: PurchaseRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PurchaseRequests_id_seq"', 1, false);


--
-- Name: Suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Suppliers_id_seq"', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: orderdetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orderdetails_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: productPrices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."productPrices_id_seq"', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: purchaseRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."purchaseRequests_id_seq"', 1, false);


--
-- Name: quotations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotations_id_seq', 1, false);


--
-- Name: shippings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shippings_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 1, false);


--
-- Name: PasswordResets PasswordResets_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."PasswordResets"
    ADD CONSTRAINT "PasswordResets_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: drafts drafts_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.drafts
    ADD CONSTRAINT drafts_pkey PRIMARY KEY (id);


--
-- Name: forgotPasswords forgotPasswords_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."forgotPasswords"
    ADD CONSTRAINT "forgotPasswords_pkey" PRIMARY KEY (id);


--
-- Name: forgotPasswords forgotPasswords_token_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."forgotPasswords"
    ADD CONSTRAINT "forgotPasswords_token_key" UNIQUE (token);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: productPrices productPrices_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."productPrices"
    ADD CONSTRAINT "productPrices_pkey" PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: purchaseRequests purchaseRequests_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."purchaseRequests"
    ADD CONSTRAINT "purchaseRequests_pkey" PRIMARY KEY (id);


--
-- Name: quotations quotations_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT quotations_pkey PRIMARY KEY (id);


--
-- Name: shippings shippings_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT shippings_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_name_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT suppliers_name_key UNIQUE (name);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- Name: verifications verifications_token_key; Type: CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT verifications_token_key UNIQUE (token);


--
-- Name: PasswordResets PasswordResets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResets"
    ADD CONSTRAINT "PasswordResets_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: PurchaseRequests PurchaseRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequests"
    ADD CONSTRAINT "PurchaseRequests_pkey" PRIMARY KEY (id);


--
-- Name: Suppliers Suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Suppliers"
    ADD CONSTRAINT "Suppliers_pkey" PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: productPrices productPrices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "productPrices_pkey" PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: purchaseRequests purchaseRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequests"
    ADD CONSTRAINT "purchaseRequests_pkey" PRIMARY KEY (id);


--
-- Name: quotations quotations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT quotations_pkey PRIMARY KEY (id);


--
-- Name: shippings shippings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shippings
    ADD CONSTRAINT shippings_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_recipientId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.notifications
    ADD CONSTRAINT "notifications_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT "orderdetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_productId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orderdetails
    ADD CONSTRAINT "orderdetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES et_proforma.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_customerId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id);


--
-- Name: orders orders_supplierId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.orders
    ADD CONSTRAINT "orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES et_proforma.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.payments
    ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices productPrices_quotationId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma."productPrices"
    ADD CONSTRAINT "productPrices_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES et_proforma.quotations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.products
    ADD CONSTRAINT "products_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quotations quotations_customerId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quotations quotations_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES et_proforma."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quotations quotations_supplierId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.quotations
    ADD CONSTRAINT "quotations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES et_proforma.suppliers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: shippings shippings_orderId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES et_proforma.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shippings shippings_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.shippings
    ADD CONSTRAINT "shippings_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: suppliers suppliers_categoryId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT "suppliers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES et_proforma.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: suppliers suppliers_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.suppliers
    ADD CONSTRAINT "suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verifications verifications_userId_fkey; Type: FK CONSTRAINT; Schema: et_proforma; Owner: postgres
--

ALTER TABLE ONLY et_proforma.verifications
    ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES et_proforma.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Products Products_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES public."PurchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PurchaseRequestSupplier PurchaseRequestSupplier_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequestSupplier"
    ADD CONSTRAINT "PurchaseRequestSupplier_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES public."PurchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PurchaseRequestSupplier PurchaseRequestSupplier_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequestSupplier"
    ADD CONSTRAINT "PurchaseRequestSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Suppliers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_productPrices_productId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "fk_productPrices_productId" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_productPrices_productId_v2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "fk_productPrices_productId_v2" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_productPrices_quotationId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "fk_productPrices_quotationId" FOREIGN KEY ("quotationId") REFERENCES public.quotations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_productPrices_quotations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "fk_productPrices_quotations" FOREIGN KEY ("quotationId") REFERENCES public.quotations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_product_price_product_id_new; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT fk_product_price_product_id_new FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices fk_product_price_quotation_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT fk_product_price_quotation_id FOREIGN KEY ("quotationId") REFERENCES public.quotations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Products fk_products_purchaseRequestId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "fk_products_purchaseRequestId" FOREIGN KEY ("purchaseRequestId") REFERENCES public."PurchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products fk_products_purchaseRequestId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "fk_products_purchaseRequestId" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products fk_purchaseRequests_products; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "fk_purchaseRequests_products" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products fk_purchaseRequests_products_new; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "fk_purchaseRequests_products_new" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PurchaseRequestSupplier fk_purchaserequestsupplier_purchaseRequestId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequestSupplier"
    ADD CONSTRAINT "fk_purchaserequestsupplier_purchaseRequestId" FOREIGN KEY ("purchaseRequestId") REFERENCES public."PurchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchaseRequestSupplier fk_purchaserequestsupplier_purchaseRequestId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequestSupplier"
    ADD CONSTRAINT "fk_purchaserequestsupplier_purchaseRequestId" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PurchaseRequestSupplier fk_purchaserequestsupplier_supplierId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequestSupplier"
    ADD CONSTRAINT "fk_purchaserequestsupplier_supplierId" FOREIGN KEY ("supplierId") REFERENCES public."Suppliers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchaseRequestSupplier fk_purchaserequestsupplier_supplierId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequestSupplier"
    ADD CONSTRAINT "fk_purchaserequestsupplier_supplierId" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT "orderdetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderdetails orderdetails_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT "orderdetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_orderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_orderid_fkey FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productPrices productPrices_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "productPrices_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- Name: productPrices productPrices_quotationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productPrices"
    ADD CONSTRAINT "productPrices_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES public.quotations(id);


--
-- Name: products products_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchaseRequestSupplier purchaseRequestSupplier_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequestSupplier"
    ADD CONSTRAINT "purchaseRequestSupplier_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchaseRequestSupplier purchaseRequestSupplier_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."purchaseRequestSupplier"
    ADD CONSTRAINT "purchaseRequestSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Suppliers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quotations quotations_purchaseRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT "quotations_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES public."purchaseRequests"(id);


--
-- Name: quotations quotations_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT "quotations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id);


--
-- Name: shippings shippings_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shippings
    ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

