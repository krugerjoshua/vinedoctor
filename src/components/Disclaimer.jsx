export default function Disclaimer({ onAccept }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F6F4EF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: 560,
        width: '100%',
        background: '#fff',
        border: '1px solid #D3D1C7',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
 
        {/* Header */}
        <div style={{
          background: '#3B6D11',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 28 }}>🍇</span>
          <div>
            <div style={{ color: '#EAF3DE', fontWeight: 700, fontSize: 18 }}>VineDoctor</div>
            <div style={{ color: '#C5DFB0', fontSize: 12, marginTop: 2 }}>
              Before you continue, please read this
            </div>
          </div>
        </div>
 
        <div style={{ padding: '24px' }}>
 
          {/* Diagnosis disclaimer */}
          <Section icon="🔬" title="For information only">
            VineDoctor uses AI to suggest possible plant conditions based on photos.
            These suggestions are <strong>not professional agricultural advice</strong> and
            should never replace consultation with a registered agronomist or
            viticulturist. Always confirm any diagnosis before applying chemical
            treatments to your vines.
          </Section>
 
          {/* Liability */}
          <Section icon="⚠️" title="No liability">
            The developers of VineDoctor accept no responsibility for crop loss,
            damage, or financial loss resulting from actions taken based on
            diagnoses provided by this app. Use of this app is entirely at your
            own risk.
          </Section>
 
          {/* Photo privacy */}
          <Section icon="📷" title="Your photos">
            Photos you upload are sent to a third-party AI service (OpenRouter)
            for analysis. They are <strong>not stored</strong> by VineDoctor and are
            not visible to the app developers. However, the AI service provider
            may retain request data in accordance with their own privacy policy.
            Do not upload photos containing personal or sensitive information.
          </Section>
 
          {/* Chemical safety */}
          <Section icon="🧪" title="Chemical safety">
            Any product or chemical recommendations provided are general suggestions
            only. Always read the full product label before use, follow all safety
            precautions, and comply with local agricultural regulations regarding
            pesticide and fungicide application.
          </Section>
 
          {/* Divider */}
          <div style={{
            borderTop: '1px solid #E8E6E0',
            margin: '20px 0',
          }} />
 
          {/* Agreement text */}
          <p style={{
            fontSize: 12,
            color: '#888',
            lineHeight: 1.6,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            By clicking <strong>I understand, continue</strong> you confirm that you have
            read and agreed to the above terms and understand that VineDoctor
            provides general guidance only.
          </p>
 
          {/* Accept button */}
          <button
            onClick={onAccept}
            style={{
              width: '100%',
              padding: '13px',
              background: '#3B6D11',
              color: '#fff',
              border: 'none',
              borderRadius: 9,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            I understand, continue
          </button>
 
          {/* Footer note */}
          <p style={{
            fontSize: 11,
            color: '#aaa',
            textAlign: 'center',
            marginTop: 12,
          }}>
            VineDoctor — diagnostic aid only. Not a substitute for professional advice.
          </p>
 
        </div>
      </div>
    </div>
  );
}
 
// Small reusable section block
function Section({ icon, title, children }) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      marginBottom: 18,
    }}>
      <div style={{
        fontSize: 20,
        flexShrink: 0,
        marginTop: 1,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#1a1a18',
          marginBottom: 4,
        }}>
          {title}
        </div>
        <p style={{
          fontSize: 13,
          color: '#555',
          lineHeight: 1.65,
          margin: 0,
        }}>
          {children}
        </p>
      </div>
    </div>
  );
}
