import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface AegisSubscriptionCancelledProps {
  customerName?: string;
  planName?: string;
  reason?: string;
  reactivateUrl?: string;
  supportEmail?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export default function AegisSubscriptionCancelled({
  customerName,
  planName,
  reason,
  reactivateUrl,
  supportEmail,
}: AegisSubscriptionCancelledProps) {
  const plan = planName || "Estándar";
  const manageUrl = reactivateUrl || `${baseUrl}/billing`;
  const helpEmail = supportEmail || "support@aegis.com";

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Tu suscripción de Aegis ha sido revocada</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/images/aegis-logo-black.png`}
                width="75"
                height="45"
                alt="Aegis Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Tu suscripción ha sido revocada</Heading>
              <Text style={mainText}>
                {customerName ? `Hola ${customerName}, ` : ""}
                te informamos que tu suscripción a Aegis ha sido revocada y el acceso a las
                funcionalidades del plan se ha deshabilitado.
              </Text>

              <Section style={detailsSection}>
                <Text style={detailsRow}>
                  <strong>Plan:</strong> {plan}
                </Text>
                {reason ? (
                  <Text style={detailsRow}>
                    <strong>Motivo:</strong> {reason}
                  </Text>
                ) : null}
              </Section>

              <Text style={text}>
                Si se trató de un error o deseas reactivar tu suscripción, puedes hacerlo desde tu
                panel de facturación. También puedes contactar a nuestro equipo.
              </Text>

              <Section style={ctaSection}>
                <Link href={manageUrl} target="_blank" style={button}>
                  Reactivar suscripción
                </Link>
              </Section>

              <Text style={mutedText}>
                ¿Necesitas ayuda? Escríbenos a{" "}
                <Link href={`mailto:${helpEmail}`} style={link}>
                  {helpEmail}
                </Link>
                .
              </Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Por tu seguridad, Aegis nunca te pedirá tu contraseña ni información bancaria por
                correo electrónico.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            Este mensaje fue producido y distribuido por Aegis, Inc., 410 Terry Ave. North, Seattle,
            WA 98109. © 2025, Aegis, Inc. Todos los derechos reservados. Aegis es una marca
            registrada de{" "}
            <Link href="https://aegis.com" target="_blank" style={link}>
              Aegis
            </Link>
            , Inc. Consulta nuestra{" "}
            <Link href="https://aegis.com/privacy" target="_blank" style={link}>
              política de privacidad
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Preview props for local development in react-email previewers
AegisSubscriptionCancelled.PreviewProps = {
  customerName: "Alex",
  planName: "Pro",
  reason: "Pago no recibido",
  reactivateUrl: `${baseUrl}/billing`,
  supportEmail: "support@aegis.com",
} satisfies AegisSubscriptionCancelledProps;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold" as const,
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const mutedText = {
  ...text,
  color: "#555",
  marginTop: 0,
};

const detailsSection = {
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  padding: "12px 16px",
};

const detailsRow = {
  ...text,
  margin: "6px 0",
};

const ctaSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "12px",
};

const button = {
  backgroundColor: "#DA1E28",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  fontWeight: 600 as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
