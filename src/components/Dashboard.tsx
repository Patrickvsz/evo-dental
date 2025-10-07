'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Building2,
  Phone,
  Download,
  AlertTriangle
} from 'lucide-react';
import { DashboardStats, User, Clinic, Rating } from '@/lib/types';

interface DashboardProps {
  stats: DashboardStats;
  onExportReport: (type: 'pdf' | 'excel') => void;
}

export default function Dashboard({ stats, onExportReport }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getAppointmentCount = () => {
    switch (selectedPeriod) {
      case 'daily': return stats.dailyAppointments;
      case 'weekly': return stats.weeklyAppointments;
      case 'monthly': return stats.monthlyAppointments;
      default: return stats.dailyAppointments;
    }
  };

  const lowRatingAlerts = stats.topDentists.filter(d => d.rating < 3).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600 mt-1">Evo Dental - Visão geral do sistema</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => onExportReport('pdf')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onExportReport('excel')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Excel
            </Button>
          </div>
        </div>

        {/* Alertas */}
        {lowRatingAlerts > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">
                    {lowRatingAlerts} dentista(s) com avaliação baixa
                  </p>
                  <p className="text-sm text-orange-600">
                    Requer atenção e possível contato com pacientes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <Users className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Atendimentos ({selectedPeriod === 'daily' ? 'Hoje' : selectedPeriod === 'weekly' ? 'Semana' : 'Mês'})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{getAppointmentCount()}</div>
                <Calendar className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Clínicas Parceiras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.totalClinics}</div>
                <Building2 className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Avaliação Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                <Star className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros de Período */}
        <Card>
          <CardHeader>
            <CardTitle>Filtrar por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button 
                variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('daily')}
                size="sm"
              >
                Diário
              </Button>
              <Button 
                variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('weekly')}
                size="sm"
              >
                Semanal
              </Button>
              <Button 
                variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('monthly')}
                size="sm"
              >
                Mensal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs com Relatórios Detalhados */}
        <Tabs defaultValue="clinics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clinics">Clínicas Mais Procuradas</TabsTrigger>
            <TabsTrigger value="dentists">Dentistas Mais Bem Avaliados</TabsTrigger>
          </TabsList>

          <TabsContent value="clinics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top 10 Clínicas Mais Procuradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topClinics.slice(0, 10).map((item, index) => (
                    <div key={item.clinic.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.clinic.name}</h3>
                          <p className="text-sm text-gray-600">{item.clinic.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {item.clickCount} cliques
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {item.clinic.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dentists">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Top 10 Dentistas Mais Bem Avaliados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topDentists.slice(0, 10).map((item, index) => (
                    <div key={item.dentist.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.dentist.name}</h3>
                          <Badge variant={item.dentist.role === 'dentist_master' ? 'default' : 'secondary'}>
                            {item.dentist.role === 'dentist_master' ? 'Master' : 'Sênior'}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{item.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.appointmentCount} atendimentos
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}