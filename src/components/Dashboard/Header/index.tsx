import { useState, useEffect } from 'react';
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
    NotificationBadge,
    RightActions,
} from './styles';
import { LogoCircle } from '../../Logo';
import { useNotifications } from '../../../hooks/useNotifications';
import { NotificationDrawer } from '../../NotificationDrawer';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchTrainerProfile } from '../../../services/trainerService';

export const Header = () => {
    const { unreadCount, criticalCount } = useNotifications();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useAuth();
    const [trainerName, setTrainerName] = useState('Personal');
    const [trainerAvatar, setTrainerAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        let mounted = true;
        fetchTrainerProfile().then(profile => {
            if (mounted && profile) {
                setTrainerName(profile.fullName || 'Personal');
                setTrainerAvatar(profile.avatarUrl);
            }
        });
        return () => { mounted = false; };
    }, [user]);

    const avatarUrl = trainerAvatar
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainerName)}&background=FF6D00&color=fff&size=80`;

    return (
        <HeaderContainer>
            <ProfileSection>
                <LogoCircle size={32} id="header-mark" />
                <UserInfo>
                    <WelcomeText>Bem-vindo de volta,</WelcomeText>
                    <UserName>{trainerName}</UserName>
                </UserInfo>
            </ProfileSection>
            <RightActions>
                <NotificationButton onClick={() => setDrawerOpen(true)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'white' }}>notifications</span>
                    {unreadCount > 0 && (
                        <NotificationBadge $critical={criticalCount > 0}>
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </NotificationBadge>
                    )}
                </NotificationButton>
                <AvatarWrapper>
                    <Avatar $imageUrl={avatarUrl} />
                    <StatusIndicator />
                </AvatarWrapper>
            </RightActions>

            {drawerOpen && <NotificationDrawer onClose={() => setDrawerOpen(false)} />}
        </HeaderContainer>
    );
};
