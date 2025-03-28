export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <html lang="pt-BR">
        <body>
          {children}
        </body>
      </html>
    );
  }