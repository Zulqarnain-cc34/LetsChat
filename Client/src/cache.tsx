import { Cache, QueryInput } from "@urql/exchange-graphcache";
import {
    LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    RegisterMutation,
} from "./generated/graphql";

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
) {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const cacheUpdates = {
    resolvers: {
        User: {
            user(parent, args, cache, info) {
                return parent.username.toUpperCase();
            },
        },
    },

    updates: {
        Mutation: {
            login: (_result: any, _: any, cache: any) => {
                betterUpdateQuery<LoginMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        if (result.login.errors) {
                            return query;
                        } else {
                            return {
                                me: result.login.user,
                            };
                        }
                    }
                );
            },
            register: (_result: any, _: any, cache: any) => {
                betterUpdateQuery<RegisterMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        if (result.register.errors) {
                            return query;
                        } else {
                            return {
                                me: result.register.user,
                            };
                        }
                    }
                );
            },
            logout: (_result: any, _: any, cache: any) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        if (result.logout === false) {
                            return query;
                        } else {
                            return {
                                me: null,
                            };
                        }
                    }
                );
            },
        },
    },
};
