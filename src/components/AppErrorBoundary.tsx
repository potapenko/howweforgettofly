import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { AppRecoveryPage } from "./AppRecoveryPage";

interface State {
  failed: boolean;
}

export class AppErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Deliberately do not log visitor-authored state or send telemetry.
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <AppRecoveryPage onRetry={() => this.setState({ failed: false })} />
    );
  }
}
