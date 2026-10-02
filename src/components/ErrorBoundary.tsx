import React from "react";
import { t } from "../lib/i18n";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackLabel?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * App-level error boundary — catches render crashes in a tab screen and shows
 * a friendly recovery UI instead of a white screen / forced reload.
 *
 * Self-contained (inline styles only): works even when app CSS fails to load.
 * Must be a class component — function components cannot be error boundaries.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("[ErrorBoundary] caught a render error:", error);
    console.error("[ErrorBoundary] component stack:", errorInfo.componentStack);
  }

  private reset = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: "100vh",
            background: "#FFF8F1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 16 }} aria-hidden="true">
            🐱
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#4A3728",
              margin: "0 0 8px",
            }}
          >
            {t('error.something_went_wrong')}
          </h1>
          <p style={{ fontSize: 15, color: "#8A7364", margin: "0 0 28px" }}>
            {this.props.fallbackLabel ??
              t('error.to_home_page_to_go_back_tap')}
          </p>
          <button
            type="button"
            onClick={this.reset}
            style={{
              background: "linear-gradient(180deg, #FFB74D 0%, #FF9E2E 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "14px 40px",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 0 #D97F1A, 0 6px 16px rgba(255,158,46,.35)",
            }}
          >
            {t('error.will_go_back')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
