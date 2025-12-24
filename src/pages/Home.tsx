import { Link } from 'react-router-dom';
import { ThemeSelector } from '../components/ThemeSelector';

function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Theme selector */}
        <div className="flex justify-end mb-4">
          <ThemeSelector />
        </div>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Mata 6 Billones de Demonios
          </h1>
          <p className="text-xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>Traducción al Español</p>
          <Link
            to="/reader"
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-bg)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Leer aquí
          </Link>
        </header>

        {/* Sobre Kill Six Billion Demons */}
        <section className="mb-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--color-ui-bg)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-ui-text)' }}>
            Sobre "Kill Six Billion Demons"
          </h2>
          <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-ui-text)', opacity: 0.9 }}>
            <p>
              <strong style={{ color: 'var(--color-text)' }}>Kill Six Billion Demons</strong> es un cómic de fantasía escrito e 
              ilustrado por Tom Bloom conocido en Internet como "Abbadon". 
            </p>
            <p>
              Puedes leer el webcomic original en inglés en:{' '}
              <a
                href="https://killsixbilliondemons.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                killsixbilliondemons.com
              </a>
            </p>
            <p> El cómic no es de nuestra autoría y no ganamos dinero por medio de su traducción.</p>
          </div>
        </section>

        {/* Sobre esta traducción */}
        <section className="mb-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--color-ui-bg)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-ui-text)' }}>
            Sobre esta traducción
          </h2>
          <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-ui-text)', opacity: 0.9 }}>
            <p>
              Esta traducción no es oficial. Es un proyecto personal que empezamos al ver que el cómic no tenía traducción al español. 
          Nuestro objetivo es hacer una buena traducción al español neutro para que más personas 
          puedan entender y disfrutar de la obra.
            </p>
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--color-ui-bg)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-ui-text)' }}>Contacto</h2>
          <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-ui-text)', opacity: 0.9 }}>
            <p>
              Para enviar sugerencias, consultas, reportar errores y otras inquietudes tenemos esta dirección de correo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Email:{' '}
                <a
                  href="mailto:ksbdspa@gmail.com"
                  className="underline transition-colors"
                  style={{ color: 'var(--color-text)' }}
                >
                  ksbdspa@gmail.com
                </a>
              </li>
            </ul>
            <p className="text-sm mt-6" style={{ color: 'var(--color-text-secondary)', opacity: 0.8 }}>
              ¡Cualquier ayuda o feedback es bienvenido!
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm mt-16 pt-8 border-t" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
          <p className="mt-2">
            Traducción al español realizada sin fines comerciales por fans.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
