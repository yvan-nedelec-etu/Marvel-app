export default function NotFound() {
  return (
    <section style={{ padding: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <h2 style={{ margin: '0.5rem 0' }}>Page not found</h2>
      <p>
        La page demandée n'existe pas. <a href="/">Retour à l'accueil</a>
      </p>
    </section>
  )
}