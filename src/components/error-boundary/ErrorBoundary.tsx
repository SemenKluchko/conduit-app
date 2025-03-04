import React, { Component, ReactNode } from 'react';

import { ErrorPage } from 'components/error-page/ErrorPage';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    // eslint-disable-next-line react/sort-comp
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorPage />;
        }

        return this.props.children;
    }
}

export { ErrorBoundary };
