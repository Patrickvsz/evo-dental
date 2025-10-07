'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Gift, 
  Trophy,
  Calendar,
  MessageSquare,
  Settings
} from 'lucide-react';
import { User, UserRole } from '@/lib/types';

interface UserProfileProps {
  user: User;
  onUpdateProfile: (userData: Partial<User>) => void;
  onGenerateReferralCode: () => void;
}

export default function UserProfile({ user, onUpdateProfile, onGenerateReferralCode }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city
  });

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'patient': return 'Paciente';
      case 'dentist_senior': return 'Dentista Sênior';
      case 'dentist_master': return 'Dentista Master';
      case 'admin': return 'Administrador';
      default: return 'Usuário';
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'dentist_master': return 'default';
      case 'dentist_senior': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Perfil */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-white/20">
                <AvatarFallback className="text-2xl font-bold bg-white/20">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                  <Badge variant={getRoleBadgeVariant(user.role)} className="bg-white/20 text-white border-white/30">
                    {getRoleLabel(user.role)}
                  </Badge>
                  {user.premium && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      <Trophy className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  {user.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{user.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold">{user.points}</div>
                <div className="text-sm opacity-90">Pontos EVO</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="referrals">Indicações</TabsTrigger>
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
            <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          </TabsList>

          {/* Aba Perfil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? 'Salvar' : 'Editar'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                {user.cpf && (
                  <div>
                    <Label>CPF</Label>
                    <Input value={user.cpf} disabled className="mt-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Indicações */}
          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Programa de Indicações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Seu Código de Indicação</h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-lg border-2 border-dashed border-gray-300">
                      <span className="font-mono text-xl font-bold text-blue-600">
                        {user.referral_code}
                      </span>
                    </div>
                    <Button onClick={onGenerateReferralCode} variant="outline">
                      Gerar Novo Código
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4 text-center">
                      <Gift className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Indique 3 Amigos</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Ganhe 1 consulta gratuita no próximo mês
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardContent className="p-4 text-center">
                      <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Plano Mensal</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Se seus indicados assinarem, ganhe 1 mês grátis
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Consultas */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Histórico de Consultas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma consulta encontrada</p>
                  <p className="text-sm">Suas consultas aparecerão aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Benefícios */}
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Benefícios e Pontos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Seus Pontos EVO</h3>
                    <div className="text-3xl font-bold text-orange-600">{user.points}</div>
                  </div>
                  <p className="text-gray-600">
                    Acumule pontos usando o app e troque por descontos especiais!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-purple-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">100 Pontos</h4>
                      <p className="text-sm text-gray-600 mb-3">10% de desconto na próxima consulta</p>
                      <Button size="sm" disabled={user.points < 100}>
                        Resgatar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-pink-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">250 Pontos</h4>
                      <p className="text-sm text-gray-600 mb-3">Consulta de limpeza gratuita</p>
                      <Button size="sm" disabled={user.points < 250}>
                        Resgatar
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {user.premium && (
                  <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">EVO Premium Ativo</h4>
                          <p className="text-sm text-yellow-700">
                            Descontos exclusivos e prioridade em agendamentos
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}