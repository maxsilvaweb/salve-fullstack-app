import client from '@/lib/apolloClient';
import { ApolloProvider, useQuery } from '@apollo/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { PatientTable } from '@/components/PatientTable';
import { GET_CLINICS } from '@/graphql/queries';
import { Clinic } from '@/global';

function MainContent() {
  const { data: clinicsData, error } = useQuery(GET_CLINICS);

  if (error) return <div>Error loading clinics: {error.message}</div>;

  const clinics = clinicsData?.clinics?.clinics || [];

  return (
    <main className="min-h-screen w-screen bg-purple-400">
      <div className="w-full h-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            Salve clinic application for interview
          </h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-center mb-6">
              <TabsTrigger value="all">All Clinics</TabsTrigger>
              {clinics.map((clinic: Clinic) => (
                <TabsTrigger key={clinic.id} value={clinic.id.toString()}>
                  {clinic.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <PatientTable />
            </TabsContent>
            {clinics.map((clinic: Clinic) => (
              <TabsContent key={clinic.id} value={clinic.id.toString()}>
                <PatientTable clinicName={clinic.name} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <MainContent />
    </ApolloProvider>
  );
}

export default App;
