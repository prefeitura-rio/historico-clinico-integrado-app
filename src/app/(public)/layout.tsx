export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    console.error('Public Layout')
    return (
      <html lang="pt-BR">
        <body>
          {children}
        </body>
      </html>
    );
  }