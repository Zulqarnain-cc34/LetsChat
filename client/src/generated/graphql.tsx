import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  Users: Array<User>;
  Findusers: Array<User>;
  me?: Maybe<User>;
  findFriends?: Maybe<UsersResponse>;
  post?: Maybe<Post>;
  posts: PostsResponse;
  Rooms: Array<Rooms>;
  getRoom: MembersResponse;
};


export type QueryFindusersArgs = {
  name: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  roomId: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryGetRoomArgs = {
  bilateral: Scalars['Boolean'];
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  profilepic?: Maybe<Scalars['String']>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  success?: Maybe<Array<Success>>;
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type Success = {
  __typename?: 'Success';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  creator: User;
  roomId: Scalars['ID'];
  likes: Scalars['Float'];
  message: Scalars['String'];
  creatorid: Scalars['ID'];
};


export type PostsResponse = {
  __typename?: 'PostsResponse';
  success?: Maybe<Array<Success>>;
  posts?: Maybe<Array<Post>>;
  errors?: Maybe<Array<FieldError>>;
};

export type Rooms = {
  __typename?: 'Rooms';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  Roomname: Scalars['String'];
  bilateral: Scalars['Boolean'];
  adminId: Scalars['ID'];
  members: Scalars['Float'];
};

export type MembersResponse = {
  __typename?: 'MembersResponse';
  success?: Maybe<Array<Success>>;
  errors?: Maybe<Array<FieldError>>;
  rooms?: Maybe<Array<Members>>;
};

export type Members = {
  __typename?: 'Members';
  joined: Scalars['DateTime'];
  userId: Scalars['Float'];
  users?: Maybe<User>;
  roomId: Scalars['Float'];
  room?: Maybe<Rooms>;
};

export type Mutation = {
  __typename?: 'Mutation';
  makeFriends: BoolResponse;
  deleteFriends: BoolResponse;
  profilePic: BoolResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  hitlike: Scalars['Boolean'];
  removelike: Scalars['Boolean'];
  createpost: PostResponse;
  updatepost: Post;
  deletepost: Scalars['Boolean'];
  leaveRoom: BoolResponse;
  updateRoom: BoolResponse;
  deleteRoom: BoolResponse;
  joinRoom: BoolResponse;
  createRoom: RoomResponse;
  createBilateralRoom: BoolResponse;
};


export type MutationMakeFriendsArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteFriendsArgs = {
  userId: Scalars['Int'];
};


export type MutationProfilePicArgs = {
  image: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameorEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationHitlikeArgs = {
  postid: Scalars['Int'];
};


export type MutationRemovelikeArgs = {
  postid: Scalars['Int'];
};


export type MutationCreatepostArgs = {
  roomId: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationUpdatepostArgs = {
  message?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletepostArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveRoomArgs = {
  bilateralRoom: Scalars['Boolean'];
  roomId: Scalars['Int'];
};


export type MutationUpdateRoomArgs = {
  newname: Scalars['String'];
  prevname: Scalars['String'];
};


export type MutationDeleteRoomArgs = {
  name: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  roomId: Scalars['Int'];
};


export type MutationCreateRoomArgs = {
  name: Scalars['String'];
};


export type MutationCreateBilateralRoomArgs = {
  fid: Scalars['Int'];
  fname: Scalars['String'];
};

export type BoolResponse = {
  __typename?: 'boolResponse';
  success?: Maybe<Array<Success>>;
  updated?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  success?: Maybe<Array<Success>>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  success?: Maybe<Array<Success>>;
  post?: Maybe<Post>;
  errors?: Maybe<Array<FieldError>>;
};

export type RoomResponse = {
  __typename?: 'RoomResponse';
  success?: Maybe<Array<Success>>;
  rooms?: Maybe<Rooms>;
  errors?: Maybe<Array<FieldError>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onlineUsers: Notifications;
  Postadded: PostResponse;
};


export type SubscriptionPostaddedArgs = {
  roomId: Scalars['Int'];
};

export type Notifications = {
  __typename?: 'Notifications';
  notifier?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type OnlineUsersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnlineUsersSubscription = (
  { __typename?: 'Subscription' }
  & { onlineUsers: (
    { __typename?: 'Notifications' }
    & RegularNotificationsFragment
  ) }
);

export type PostAddedSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type PostAddedSubscription = (
  { __typename?: 'Subscription' }
  & { Postadded: (
    { __typename?: 'PostResponse' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & RegularPostsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularNotificationsFragment = (
  { __typename?: 'Notifications' }
  & Pick<Notifications, 'message' | 'notifier'>
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'creatorid' | 'message'>
);

export type RegularPostsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'creatorid' | 'message'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularRoomsFragment = (
  { __typename?: 'Rooms' }
  & Pick<Rooms, 'id' | 'adminId' | 'Roomname' | 'members'>
);

export type RegularSuccessFragment = (
  { __typename?: 'Success' }
  & Pick<Success, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'profilepic'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'RoomResponse' }
    & { rooms?: Maybe<(
      { __typename?: 'Rooms' }
      & RegularRoomsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type CreatepostMutationVariables = Exact<{
  message: Scalars['String'];
  roomId: Scalars['Int'];
}>;


export type CreatepostMutation = (
  { __typename?: 'Mutation' }
  & { createpost: (
    { __typename?: 'PostResponse' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & RegularPostFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type DeletefriendsMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeletefriendsMutation = (
  { __typename?: 'Mutation' }
  & { deleteFriends: (
    { __typename?: 'boolResponse' }
    & Pick<BoolResponse, 'updated'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type ForgotpasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotpasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type JoinroomMutationVariables = Exact<{
  roomid: Scalars['Int'];
}>;


export type JoinroomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename?: 'boolResponse' }
    & Pick<BoolResponse, 'updated'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameorEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MakefriendsMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type MakefriendsMutation = (
  { __typename?: 'Mutation' }
  & { makeFriends: (
    { __typename?: 'boolResponse' }
    & Pick<BoolResponse, 'updated'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { profilePic: (
    { __typename?: 'boolResponse' }
    & Pick<BoolResponse, 'updated'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type CreateBilateralRoomMutationVariables = Exact<{
  fid: Scalars['Int'];
  fname: Scalars['String'];
}>;


export type CreateBilateralRoomMutation = (
  { __typename?: 'Mutation' }
  & { createBilateralRoom: (
    { __typename?: 'boolResponse' }
    & Pick<BoolResponse, 'updated'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type FindFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindFriendsQuery = (
  { __typename?: 'Query' }
  & { findFriends?: Maybe<(
    { __typename?: 'UsersResponse' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>> }
  )> }
);

export type FindUsersQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindUsersQuery = (
  { __typename?: 'Query' }
  & { Findusers: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type GetpostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  roomId: Scalars['Int'];
}>;


export type GetpostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsResponse' }
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & RegularPostsFragment
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type GetroomsQueryVariables = Exact<{
  limit: Scalars['Int'];
  bilateral: Scalars['Boolean'];
}>;


export type GetroomsQuery = (
  { __typename?: 'Query' }
  & { getRoom: (
    { __typename?: 'MembersResponse' }
    & { rooms?: Maybe<Array<(
      { __typename?: 'Members' }
      & { room?: Maybe<(
        { __typename?: 'Rooms' }
        & RegularRoomsFragment
      )> }
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, success?: Maybe<Array<(
      { __typename?: 'Success' }
      & RegularSuccessFragment
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularNotificationsFragmentDoc = gql`
    fragment RegularNotifications on Notifications {
  message
  notifier
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  createdAt
  updatedAt
  creatorid
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  profilepic
}
    `;
export const RegularPostsFragmentDoc = gql`
    fragment RegularPosts on Post {
  id
  createdAt
  updatedAt
  creatorid
  message
  creator {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularRoomsFragmentDoc = gql`
    fragment RegularRooms on Rooms {
  id
  adminId
  Roomname
  members
}
    `;
export const RegularSuccessFragmentDoc = gql`
    fragment RegularSuccess on Success {
  field
  message
}
    `;
export const OnlineUsersDocument = gql`
    subscription OnlineUsers {
  onlineUsers {
    ...RegularNotifications
  }
}
    ${RegularNotificationsFragmentDoc}`;

export function useOnlineUsersSubscription<TData = OnlineUsersSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnlineUsersSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnlineUsersSubscription, TData>) {
  return Urql.useSubscription<OnlineUsersSubscription, TData, OnlineUsersSubscriptionVariables>({ query: OnlineUsersDocument, ...options }, handler);
};
export const PostAddedDocument = gql`
    subscription postAdded($roomId: Int!) {
  Postadded(roomId: $roomId) {
    post {
      ...RegularPosts
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularPostsFragmentDoc}
${RegularErrorFragmentDoc}`;

export function usePostAddedSubscription<TData = PostAddedSubscription>(options: Omit<Urql.UseSubscriptionArgs<PostAddedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<PostAddedSubscription, TData>) {
  return Urql.useSubscription<PostAddedSubscription, TData, PostAddedSubscriptionVariables>({ query: PostAddedDocument, ...options }, handler);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, newPassword: $password) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateRoomDocument = gql`
    mutation createRoom($name: String!) {
  createRoom(name: $name) {
    rooms {
      ...RegularRooms
    }
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularRoomsFragmentDoc}
${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument);
};
export const CreatepostDocument = gql`
    mutation createpost($message: String!, $roomId: Int!) {
  createpost(roomId: $roomId, message: $message) {
    post {
      ...RegularPost
    }
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularPostFragmentDoc}
${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useCreatepostMutation() {
  return Urql.useMutation<CreatepostMutation, CreatepostMutationVariables>(CreatepostDocument);
};
export const DeletefriendsDocument = gql`
    mutation deletefriends($userId: Int!) {
  deleteFriends(userId: $userId) {
    updated
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useDeletefriendsMutation() {
  return Urql.useMutation<DeletefriendsMutation, DeletefriendsMutationVariables>(DeletefriendsDocument);
};
export const ForgotpasswordDocument = gql`
    mutation forgotpassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotpasswordMutation() {
  return Urql.useMutation<ForgotpasswordMutation, ForgotpasswordMutationVariables>(ForgotpasswordDocument);
};
export const JoinroomDocument = gql`
    mutation joinroom($roomid: Int!) {
  joinRoom(roomId: $roomid) {
    updated
    errors {
      field
      message
    }
  }
}
    `;

export function useJoinroomMutation() {
  return Urql.useMutation<JoinroomMutation, JoinroomMutationVariables>(JoinroomDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameorEmail: String!, $password: String!) {
  login(usernameorEmail: $usernameorEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MakefriendsDocument = gql`
    mutation makefriends($userId: Int!) {
  makeFriends(userId: $userId) {
    updated
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useMakefriendsMutation() {
  return Urql.useMutation<MakefriendsMutation, MakefriendsMutationVariables>(MakefriendsDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UploadImageDocument = gql`
    mutation UploadImage($image: String!) {
  profilePic(image: $image) {
    updated
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useUploadImageMutation() {
  return Urql.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument);
};
export const CreateBilateralRoomDocument = gql`
    mutation createBilateralRoom($fid: Int!, $fname: String!) {
  createBilateralRoom(fid: $fid, fname: $fname) {
    updated
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateBilateralRoomMutation() {
  return Urql.useMutation<CreateBilateralRoomMutation, CreateBilateralRoomMutationVariables>(CreateBilateralRoomDocument);
};
export const FindFriendsDocument = gql`
    query FindFriends {
  findFriends {
    users {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useFindFriendsQuery(options: Omit<Urql.UseQueryArgs<FindFriendsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindFriendsQuery>({ query: FindFriendsDocument, ...options });
};
export const FindUsersDocument = gql`
    query FindUsers($name: String!) {
  Findusers(name: $name) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useFindUsersQuery(options: Omit<Urql.UseQueryArgs<FindUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindUsersQuery>({ query: FindUsersDocument, ...options });
};
export const GetpostsDocument = gql`
    query getposts($limit: Int!, $roomId: Int!) {
  posts(limit: $limit, roomId: $roomId) {
    posts {
      ...RegularPosts
    }
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularPostsFragmentDoc}
${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useGetpostsQuery(options: Omit<Urql.UseQueryArgs<GetpostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetpostsQuery>({ query: GetpostsDocument, ...options });
};
export const GetroomsDocument = gql`
    query getrooms($limit: Int!, $bilateral: Boolean!) {
  getRoom(limit: $limit, bilateral: $bilateral) {
    rooms {
      room {
        ...RegularRooms
      }
    }
    errors {
      ...RegularError
    }
    success {
      ...RegularSuccess
    }
  }
}
    ${RegularRoomsFragmentDoc}
${RegularErrorFragmentDoc}
${RegularSuccessFragmentDoc}`;

export function useGetroomsQuery(options: Omit<Urql.UseQueryArgs<GetroomsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetroomsQuery>({ query: GetroomsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};