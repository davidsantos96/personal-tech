import {
    ListSection,
    SectionHeader,
    Title,
    ViewAllButton,
    ScrollContainer,
    StudentCard,
    StatusBar,
    StudentAvatar,
    StudentInfo,
    TimeLabel,
    StudentName,
    TrainingDetail
} from './styles';

export const StudentsList = () => {
    return (
        <ListSection>
            <SectionHeader>
                <Title>Próximos Alunos</Title>
                <ViewAllButton>Ver agenda</ViewAllButton>
            </SectionHeader>
            <ScrollContainer>
                {/* Ana Costa */}
                <StudentCard>
                    <StatusBar $color="#FF6D00" />
                    <StudentAvatar $imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCr9f4khYp6BeXfJ6yahnSwfGI5mChzsQCxQSDQJpPuyrxgkdjpuyL7K2kMoSzjcxzAyUQnfCf41flGoXNRbamOCvMsrf7NVu7xlvTNZPNOpQmpl5-2ydj01dRxAKBUfgm_kP0ikuokk133w2EOZIHSoPyA8nTI56rgVYk40W0apXN3uIzp-Idufmau97JPXiwZ4VCRzKSv4b98HEFRs6RevXIQPwH91J7-7bUgkUNPP-GBJw8HYSbYipj36lCSO6ixaNvFjjKIeQ" />
                    <StudentInfo>
                        <TimeLabel $color="#FF6D00">10:00 - Musculação</TimeLabel>
                        <StudentName>Ana Costa</StudentName>
                        <TrainingDetail>Série B • Peito/Tríceps</TrainingDetail>
                    </StudentInfo>
                </StudentCard>

                {/* Bruno Dias */}
                <StudentCard>
                    <StatusBar $color="#EAB308" /> {/* yellow-500 */}
                    <StudentAvatar $imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDpFm8bJG1fF1iw5VjSAjBsQ2nVFiRY8nvr9G_0Rv7umbFj5Xi5MKb5WSI8FYdep6Z_OeO_l8YLc_ttw5Eg5BKjKpv4_CIDvDjVGIJ2KEH18Jp5jx-rzXaENbQXvAj0DWiswOgyeUsW3lB2URVx6v4vGIIn9_o36JuVDRcMkI48tmgXzMFYvTr-WvhvWXLy-qZJ0VFLNB9EArEAhEXMavls_LrC5yrItneMETFTQt_IrK_KaHXZCAYhajyQ49AoLi3eBmyW-Zer9Q" />
                    <StudentInfo>
                        <TimeLabel $color="#EAB308">11:30 - HIIT</TimeLabel>
                        <StudentName>Bruno Dias</StudentName>
                        <TrainingDetail>Cardio • Alta Intensidade</TrainingDetail>
                    </StudentInfo>
                </StudentCard>

                {/* Carla Silva */}
                <StudentCard>
                    <StatusBar $color="#3B82F6" /> {/* blue-500 */}
                    <StudentAvatar $imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTyWl_Pyj_59CsLQ46VhNTGfm0sOyjqKiQmspbMbCA6uz85kXLVm-jQbAif6LDn2L9-T_ayUOc81nup2ZDL9fO-MZu9wv70iv4OmeeyZm9Jxg8pKoIfMwA0NYtBVlE9_maH-DaeN8KexZ54QZmhtNYomc_aqVvCu32dv6526QEfIKZ3z0yaJ3dN_mXt8H92bRveVLNXTLss9I21-It7fKOcPMsgSdfTLuG8dDvuOUPhcW3nKCbRUqoC_4OBNuhBrW3R8RSXLF8Q" />
                    <StudentInfo>
                        <TimeLabel $color="#3B82F6">14:00 - Funcional</TimeLabel>
                        <StudentName>Carla Silva</StudentName>
                        <TrainingDetail>Mobilidade • Core</TrainingDetail>
                    </StudentInfo>
                </StudentCard>
            </ScrollContainer>
        </ListSection>
    );
};
