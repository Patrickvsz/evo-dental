'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Stethoscope,
  Calendar,
  MessageSquare,
  Gift,
  User,
  Home,
  Star,
  Phone,
  MapPin,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Bell,
  Heart,
  Shield,
  Award,
  Zap,
  CheckCircle
} from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import UserProfile from '@/components/UserProfile';
import { User as UserType, UserRole, DashboardStats, Clinic } from '@/lib/types';
import { generateReferralCode, isMockMode } from '@/lib/supabase';

export default function EvoDental() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'appointments' | 'messages' | 'benefits' | 'profile' | 'dashboard'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data para demonstração completa
  const mockUser: UserType = {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao@evodental.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    city: 'São Paulo',
    role: 'admin', // Mudando para admin para mostrar dashboard
    rating: 4.8,
    created_at: '2024-01-01',
    referral_code: 'JOA123',
    points: 350,
    premium: true
  };

  const mockStats: DashboardStats = {
    totalAppointments: 1250,
    dailyAppointments: 45,
    weeklyAppointments: 280,
    monthlyAppointments: 1100,
    averageRating: 4.6,
    totalUsers: 2500,
    totalClinics: 150,
    topClinics: [
      {
        clinic: {
          id: '1',
          name: 'Clínica Dental Plus',
          address: 'Rua das Flores, 123',
          phone: '(11) 3333-4444',
          whatsapp: '(11) 99999-8888',
          city: 'São Paulo',
          rating: 4.9,
          created_at: '2024-01-01'
        },
        clickCount: 156
      },
      {
        clinic: {
          id: '2',
          name: 'Odonto Excellence',
          address: 'Av. Paulista, 456',
          phone: '(11) 2222-3333',
          whatsapp: '(11) 88888-7777',
          city: 'São Paulo',
          rating: 4.7,
          created_at: '2024-01-01'
        },
        clickCount: 134
      }
    ],
    topDentists: [
      {
        dentist: mockUser,
        rating: 4.8,
        appointmentCount: 89
      },
      {
        dentist: {
          id: '2',
          name: 'Dra. Maria Santos',
          email: 'maria@evodental.com',
          phone: '(11) 88888-7777',
          city: 'São Paulo',
          role: 'dentist_master',
          rating: 4.9,
          created_at: '2024-01-01',
          referral_code: 'MAR456',
          points: 280,
          premium: false
        },
        rating: 4.9,
        appointmentCount: 95
      }
    ]
  };

  const mockClinics: Clinic[] = [
    {
      id: '1',
      name: 'Clínica Dental Plus',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 3333-4444',
      whatsapp: '(11) 99999-8888',
      city: 'São Paulo',
      rating: 4.9,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Odonto Excellence',
      address: 'Av. Paulista, 456 - Bela Vista',
      phone: '(11) 2222-3333',
      whatsapp: '(11) 88888-7777',
      city: 'São Paulo',
      rating: 4.7,
      created_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Sorriso Perfeito',
      address: 'Rua Augusta, 789 - Consolação',
      phone: '(11) 1111-2222',
      whatsapp: '(11) 77777-6666',
      city: 'São Paulo',
      rating: 4.8,
      created_at: '2024-01-01'
    },
    {
      id: '4',
      name: 'Dental Care 24h',
      address: 'Rua da Consolação, 321 - Centro',
      phone: '(11) 4444-5555',
      whatsapp: '(11) 66666-5555',
      city: 'São Paulo',
      rating: 4.6,
      created_at: '2024-01-01'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setCurrentUser(mockUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateProfile = (userData: Partial<UserType>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...userData });
    }
  };

  const handleGenerateReferralCode = () => {
    if (currentUser) {
      const newCode = generateReferralCode(currentUser.name);
      setCurrentUser({ ...currentUser, referral_code: newCode });
    }
  };

  const handleExportReport = (type: 'pdf' | 'excel') => {
    console.log(`Exportando relatório em ${type}`);
    // Simular exportação
    alert(`Relatório ${type.toUpperCase()} exportado com sucesso!`);
  };

  const handleClinicClick = (clinicId: string) => {
    console.log(`Clique registrado na clínica: ${clinicId}`);
    // Simular registro de clique
    const clinic = mockClinics.find(c => c.id === clinicId);
    if (clinic) {
      alert(`Redirecionando para ${clinic.name}...`);
    }
  };

  const filteredClinics = mockClinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderNavigation = () => (
    <nav className="bg-white border-t border-gray-200 md:border-t-0 md:border-r md:w-64 md:min-h-screen">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">Evo Dental</h1>
            <p className="text-xs text-gray-600">Precisão cirúrgica</p>
          </div>
        </div>

        {/* Indicador de modo mock */}
        {isMockMode() && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Modo Demo Ativo</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('home')}
          >
            <Home className="w-4 h-4 mr-3" />
            Início
          </Button>
          
          <Button
            variant={currentView === 'appointments' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('appointments')}
          >
            <Calendar className="w-4 h-4 mr-3" />
            Consultas
          </Button>
          
          <Button
            variant={currentView === 'messages' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('messages')}
          >
            <MessageSquare className="w-4 h-4 mr-3" />
            Mensagens
          </Button>
          
          <Button
            variant={currentView === 'benefits' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('benefits')}
          >
            <Gift className="w-4 h-4 mr-3" />
            Benefícios
          </Button>
          
          <Button
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('profile')}
          >
            <User className="w-4 h-4 mr-3" />
            Perfil
          </Button>

          {currentUser?.role === 'admin' && (
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('dashboard')}
            >
              <Settings className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </nav>
  );

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Olá, {currentUser?.name.split(' ')[0]}! 👋
            </h2>
            <p className="opacity-90">
              Como podemos ajudar você hoje?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <Badge className="bg-white/20 text-white border-white/30">
              3 notificações
            </Badge>
          </div>
        </div>
      </div>

      {/* Busca de clínicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Encontrar Clínicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Buscar por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClinics.map((clinic) => (
              <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{clinic.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{clinic.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {clinic.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {clinic.phone}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleClinicClick(clinic.id)}
                    >
                      Agendar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleClinicClick(clinic.id)}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recursos rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800">Emergência</h3>
            <p className="text-xs text-green-600 mt-1">Atendimento 24h</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">Prevenção</h3>
            <p className="text-xs text-blue-600 mt-1">Limpeza e check-up</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-800">Ortodontia</h3>
            <p className="text-xs text-purple-600 mt-1">Aparelhos e alinhadores</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold text-yellow-800">Estética</h3>
            <p className="text-xs text-yellow-600 mt-1">Clareamento e facetas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAppointmentsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Minhas Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma consulta agendada</h3>
            <p className="mb-4">Que tal agendar sua primeira consulta?</p>
            <Button onClick={() => setCurrentView('home')}>
              Encontrar Clínicas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessagesView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma mensagem</h3>
            <p>Suas conversas com dentistas aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBenefitsView = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Seus Pontos EVO</h2>
              <p className="opacity-90">Acumule e troque por benefícios</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{currentUser?.points}</div>
              <div className="text-sm opacity-90">pontos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Programa de Indicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4 bg-blue-50 rounded-lg mb-4">
              <div className="font-mono text-2xl font-bold text-blue-600 mb-2">
                {currentUser?.referral_code}
              </div>
              <p className="text-sm text-gray-600">Seu código de indicação</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <span>Indique 3 amigos = 1 consulta grátis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <span>Indicados assinam plano = 1 mês grátis</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recompensas Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">10% de desconto</div>
                <div className="text-sm text-gray-600">100 pontos</div>
              </div>
              <Button size="sm" disabled={!currentUser || currentUser.points < 100}>
                Resgatar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">Limpeza gratuita</div>
                <div className="text-sm text-gray-600">250 pontos</div>
              </div>
              <Button size="sm" disabled={!currentUser || currentUser.points < 250}>
                Resgatar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="font-semibold text-green-800">Consulta premium</div>
                <div className="text-sm text-green-600">350 pontos</div>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Resgatar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Evo Dental</h1>
          <p className="text-gray-600">Carregando aplicativo...</p>
          <div className="mt-4 w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro de Carregamento</h1>
          <p className="text-gray-600">Não foi possível carregar os dados do usuário</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg">Evo Dental</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          {renderNavigation()}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg">Menu</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {renderNavigation()}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {currentView === 'home' && renderHomeView()}
          {currentView === 'appointments' && renderAppointmentsView()}
          {currentView === 'messages' && renderMessagesView()}
          {currentView === 'benefits' && renderBenefitsView()}
          {currentView === 'profile' && (
            <UserProfile
              user={currentUser}
              onUpdateProfile={handleUpdateProfile}
              onGenerateReferralCode={handleGenerateReferralCode}
            />
          )}
          {currentView === 'dashboard' && currentUser.role === 'admin' && (
            <Dashboard
              stats={mockStats}
              onExportReport={handleExportReport}
            />
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => {
              setCurrentView('home');
              setIsMenuOpen(false);
            }}
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">Início</span>
          </Button>
          
          <Button
            variant={currentView === 'appointments' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => {
              setCurrentView('appointments');
              setIsMenuOpen(false);
            }}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Consultas</span>
          </Button>
          
          <Button
            variant={currentView === 'messages' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => {
              setCurrentView('messages');
              setIsMenuOpen(false);
            }}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Mensagens</span>
          </Button>
          
          <Button
            variant={currentView === 'benefits' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => {
              setCurrentView('benefits');
              setIsMenuOpen(false);
            }}
          >
            <Gift className="w-4 h-4" />
            <span className="text-xs">Benefícios</span>
          </Button>
          
          <Button
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => {
              setCurrentView('profile');
              setIsMenuOpen(false);
            }}
          >
            <User className="w-4 h-4" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}