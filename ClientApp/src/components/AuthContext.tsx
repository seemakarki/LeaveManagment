 import * as React from "react";
import { getMeta } from "../services/auth";
import { userMeta } from "./login.component";


const { Provider, Consumer: AuthConsumer } = React.createContext<AuthContextValue>({
    isAuthenticated: false,
    userMeta: {
        UserName: '',
        UserId: 0,
        RoleId: 0,

    }
})

interface AuthContextValue {
    isAuthenticated: boolean;
    userMeta: userMeta;
}

export class AuthProvider extends React.Component<{}, AuthContextValue>{
    async componentDidMount() {
        const userMeta = await getMeta()
        if (userMeta) {
            this.setState({
                userMeta,
                isAuthenticated: true
            })
        }
    }
    render() {
        const { children } = this.props;
        return <Provider value={this.state}>
            {children}
        </Provider>
    }
}

export interface AuthContextProps {
    authContextValue: AuthContextValue
}

export function withAuthContext<P extends AuthContextProps, S = {}>(Component: ReactComponent<P, S>) {
    return class WithContext extends React.Component<Omit<P, keyof AuthContextProps>> {
        render() {
            return <AuthConsumer>
                {(value) => value && value.isAuthenticated ? <Component {...this.props as any} authContextValue={value} /> :null}
            </AuthConsumer>
        }
    }
}
