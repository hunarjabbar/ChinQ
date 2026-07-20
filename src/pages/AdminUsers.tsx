import { apiFetch } from '../lib/api';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Plus, Search, Shield, User, Mail, Trash2, Edit, Activity, Building, Lock } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

export function AdminUsers() {
  const { lang } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR',
    subscriptionStatus: 'INACTIVE',
    subscriptionPlan: 'PREMIUM'
  });

  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to create user');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedUser: any) => {
      const res = await apiFetch(`/api/admin/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          subscriptionStatus: updatedUser.subscriptionStatus,
          subscriptionPlan: updatedUser.subscriptionPlan
        })
      });
      if (!res.ok) throw new Error('Failed to update user');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete user');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'AUTHOR', subscriptionStatus: 'INACTIVE', subscriptionPlan: 'PREMIUM' });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      subscriptionStatus: user.subscriptionStatus || 'INACTIVE',
      subscriptionPlan: user.subscriptionPlan || 'PREMIUM'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout userRole="ADMIN">
      <div className="space-y-6 text-start max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-serif font-black tracking-tight text-[#111111] uppercase">Access Control</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Manage institutional credentials and authorizations.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-[#111111] hover:bg-[#990000] text-white px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Provision Credentials
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutional database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-sm flex items-center gap-3">
              <div className="p-1.5 bg-blue-50 text-blue-700 rounded-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Admins</div>
                <div className="text-sm font-black">{users.filter((u:any) => u.role === 'ADMIN').length}</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-sm flex items-center gap-3">
              <div className="p-1.5 bg-green-50 text-green-700 rounded-sm">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Active Users</div>
                <div className="text-sm font-black">{users.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Data Grid */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FAFAFA]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Personnel</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Clearance Level</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Activity</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Subscription</th>
                  <th scope="col" className="px-6 py-4 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                      <div className="flex justify-center mb-2"><Activity className="w-5 h-5 animate-pulse text-[#990000]" /></div>
                      Retrieving Secure Manifest...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                      No personnel records match criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-sm bg-[#111111] flex items-center justify-center text-white font-black text-sm uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-[9px] leading-5 font-black uppercase tracking-widest rounded-sm ${
                          user.role === 'ADMIN' ? 'bg-[#990000] text-white' : 
                          user.role === 'EDITOR' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`px-2 py-0.5 inline-flex text-[9px] font-bold uppercase w-fit rounded-sm ${user.subscriptionStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            {user.subscriptionStatus || 'INACTIVE'}
                          </span>
                          {user.subscriptionStatus === 'ACTIVE' && (
                            <span className="text-[10px] text-gray-400 mt-1">{user.subscriptionPlan}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => openEditModal(user)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Revoke access for this user?')) {
                                deleteMutation.mutate(user.id);
                              }
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-sm shadow-2xl max-w-md w-full overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-[#FAFAFA] flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#111111] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#990000]" />
                  {editingUser ? 'Modify Clearance' : 'Provision Credentials'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Operative Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Corporate Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm"
                      placeholder="jane.doe@chinq.media"
                    />
                  </div>
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Initial Passkey</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Subscription Status</label>
                  <select
                    value={formData.subscriptionStatus}
                    onChange={(e) => setFormData({...formData, subscriptionStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm appearance-none bg-white mb-4"
                  >
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CANCELED">CANCELED</option>
                  </select>
                </div>
                
                {formData.subscriptionStatus === 'ACTIVE' && (
                  <div>
                    <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Subscription Plan</label>
                    <select
                      value={formData.subscriptionPlan}
                      onChange={(e) => setFormData({...formData, subscriptionPlan: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm appearance-none bg-white mb-4"
                    >
                      <option value="PREMIUM">Premium Access</option>
                      <option value="ENTERPRISE">Enterprise Analytics</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Clearance Level</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-[#990000] focus:border-[#990000] text-sm appearance-none bg-white"
                    >
                      <option value="AUTHOR">Journalist / Author (Restricted)</option>
                      <option value="EDITOR">Bureau Chief / Editor</option>
                      <option value="ADMIN">System Administrator (Full Access)</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="px-4 py-2 bg-[#111111] text-white rounded-sm hover:bg-[#990000] transition-colors text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                  >
                    {editingUser ? 'Update Clearance' : 'Issue Credentials'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
