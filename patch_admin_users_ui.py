with open("src/pages/AdminUsers.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '<th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Activity</th>',
    '<th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Activity</th>\n                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#111111]">Subscription</th>'
)

td_activity = """                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>"""

td_activity_new = """                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
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
                      </td>"""

content = content.replace(td_activity, td_activity_new)

modal_bottom = """                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Clearance Level</label>"""

modal_bottom_new = """                <div>
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
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Clearance Level</label>"""

content = content.replace(modal_bottom, modal_bottom_new)

with open("src/pages/AdminUsers.tsx", "w", encoding="utf-8") as f:
    f.write(content)
