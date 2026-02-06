import {
    HeaderContainer,
    ProfileSection,
    AvatarWrapper,
    Avatar,
    StatusIndicator,
    UserInfo,
    WelcomeText,
    UserName,
    NotificationButton,
    NotificationDot
} from './styles';

export const Header = () => {
    return (
        <HeaderContainer>
            <ProfileSection>
                <AvatarWrapper>
                    <Avatar $imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAhI5bTxWoSqozBUZJtbD_9FARUZp5YrLgi4mE8oYCFCe4YSjj9Gv14QNQgasu7bU1BgIPSW8fZsy3_ZOGs1mNlnf_sFDP0FvjNJXaZwp15hE6ZPAWCxHIBqS_api546-57iiDUCVjYI2tw7Zz41z5p3pv8w2eMxx_J9eaHnz9UBbUfFBDadBaPsAYXztV0s9Jq-Bu6ZnMc4VPUKIR62_eXovOI9Q3sHyDycqp9njPu5DE2W2qE-_8mWBv-Rw5dbGd3AAETIt9l5w" />
                    <StatusIndicator />
                </AvatarWrapper>
                <UserInfo>
                    <WelcomeText>Bem-vindo de volta,</WelcomeText>
                    <UserName>Coach Silva</UserName>
                </UserInfo>
            </ProfileSection>
            <NotificationButton>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'white' }}>notifications</span>
                <NotificationDot />
            </NotificationButton>
        </HeaderContainer>
    );
};
