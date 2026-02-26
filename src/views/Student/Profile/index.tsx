import { studentProfile } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import {
    Container,
    ProfileHeader,
    AvatarWrapper,
    Avatar,
    ProfileName,
    ProfileGoal,
    CardList,
    Card,
    CardTitle,
    TrainerRow,
    TrainerAvatar,
    TrainerName,
    TrainerPhone,
    PlanRow,
    PlanLabel,
    PlanValue,
    LogoutButton,
} from './styles';

export const StudentProfileView = () => {

    return (
        <Container>
            <ProfileHeader>
                <AvatarWrapper>
                    <Avatar src={studentProfile.avatar} alt={studentProfile.name} />
                </AvatarWrapper>
                <ProfileName>{studentProfile.name}</ProfileName>
                <ProfileGoal>{studentProfile.goal.toUpperCase()}</ProfileGoal>
            </ProfileHeader>

            <CardList>
                <Card>
                    <CardTitle>MEU PERSONAL</CardTitle>
                    <TrainerRow>
                        <TrainerAvatar src={studentProfile.trainer.avatar} alt={studentProfile.trainer.name} />
                        <div>
                            <TrainerName>{studentProfile.trainer.name}</TrainerName>
                            <TrainerPhone>{studentProfile.trainer.phone}</TrainerPhone>
                        </div>
                    </TrainerRow>
                </Card>

                <Card>
                    <CardTitle>DETALHES DO PLANO</CardTitle>
                    <PlanRow>
                        <PlanLabel>Membro desde</PlanLabel>
                        <PlanValue>{new Date(studentProfile.startedAt).toLocaleDateString('pt-BR')}</PlanValue>
                    </PlanRow>
                    <PlanRow>
                        <PlanLabel>Plano válido até</PlanLabel>
                        <PlanValue $color="#22C55E">{new Date(studentProfile.planActiveUntil).toLocaleDateString('pt-BR')}</PlanValue>
                    </PlanRow>
                </Card>

                <LogoutButton>Sair da Conta</LogoutButton>
            </CardList>

            <StudentBottomNav />
        </Container>
    );
};
