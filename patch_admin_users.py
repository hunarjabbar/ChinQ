with open("src/pages/AdminUsers.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace formData initial state
old_formdata = """  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR'
  });"""
new_formdata = """  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR',
    subscriptionStatus: 'INACTIVE',
    subscriptionPlan: 'PREMIUM'
  });"""
content = content.replace(old_formdata, new_formdata)

# Replace updateMutation body
old_update_body = """        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role
        })"""
new_update_body = """        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          subscriptionStatus: updatedUser.subscriptionStatus,
          subscriptionPlan: updatedUser.subscriptionPlan
        })"""
content = content.replace(old_update_body, new_update_body)

# Replace resetForm
old_reset = """  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'AUTHOR' });
    setEditingUser(null);
  };"""
new_reset = """  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'AUTHOR', subscriptionStatus: 'INACTIVE', subscriptionPlan: 'PREMIUM' });
    setEditingUser(null);
  };"""
content = content.replace(old_reset, new_reset)

# Replace openEditModal
old_edit = """    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });"""
new_edit = """    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      subscriptionStatus: user.subscriptionStatus || 'INACTIVE',
      subscriptionPlan: user.subscriptionPlan || 'PREMIUM'
    });"""
content = content.replace(old_edit, new_edit)

with open("src/pages/AdminUsers.tsx", "w", encoding="utf-8") as f:
    f.write(content)
