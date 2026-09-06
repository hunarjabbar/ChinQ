import fs from 'fs';
let code = fs.readFileSync('src/components/ErrorBoundary.tsx', 'utf8');

if (!code.includes("componentDidUpdate")) {
  code = code.replace(
    '  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {',
    `  public componentDidUpdate(prevProps: Props) {
    // Basic check to reset error state when lang prop changes, ideally location changes
    if (this.props.lang !== prevProps.lang) {
      this.setState({ hasError: false, error: null });
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {`
  );
  fs.writeFileSync('src/components/ErrorBoundary.tsx', code);
}
