import { HomeContainer, ScrollArea } from './styles';
import { Header } from '../../components/Dashboard/Header';
import { StatsCards } from '../../components/Dashboard/StatsCards';
import { StudentsList } from '../../components/Dashboard/StudentsList';
import { AlertSection } from '../../components/Dashboard/AlertSection';
import { RevenueWidget } from '../../components/Dashboard/RevenueWidget';
import { BottomNav } from '../../components/Layout/BottomNav';

export const Home = () => {
    return (
        <HomeContainer>
            <Header />
            <ScrollArea>
                <StatsCards />
                <StudentsList />
                <AlertSection />
                <RevenueWidget />
            </ScrollArea>
            <BottomNav />
        </HomeContainer>
    );
};
