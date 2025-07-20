# 🚀 **CMS Access Guide - Deep Engineering Website**

## **📋 How to Access the CMS**

### **🎯 Quick Access Methods:**

#### **Method 1: Main Navigation (Recommended)**
1. **Login** to your account at `http://localhost:3000/login`
2. **Ensure you have admin or super_admin role**
3. **Look for "Admin Panel"** in the main navigation menu
4. **Click "Admin Panel"** to access the CMS

#### **Method 2: User Dropdown Menu**
1. **Login** to your account
2. **Click on your user profile** (top right corner)
3. **Look for "Admin Panel"** in the dropdown menu
4. **Click "Admin Panel"** to access the CMS

#### **Method 3: Direct URL Access**
- **URL**: `http://localhost:3000/admin`
- **Note**: You must be logged in with admin or super_admin role

---

## **🔐 Authentication Requirements**

### **Required Roles:**
- ✅ **Admin** - Full CMS access
- ✅ **Super Admin** - Full CMS access + additional privileges
- ❌ **Editor** - No CMS access
- ❌ **Author** - No CMS access  
- ❌ **User** - No CMS access

### **Login Process:**
1. Go to `http://localhost:3000/login`
2. Enter your credentials
3. Ensure your account has admin or super_admin role
4. Access the CMS through any method above

---

## **🎨 CMS Features Available**

### **📊 Dashboard**
- System overview and statistics
- Quick action buttons
- Recent activity feed
- User overview charts

### **📝 Content Management**
- **All Pages**: View and manage all website pages
- **Create Page**: Add new pages to the website
- **Page Editor**: Edit existing page content
- **SEO Management**: Optimize page SEO

### **📁 Project Management**
- **All Projects**: View and manage all projects
- **Create Project**: Start new KPP projects
- **Project Editor**: Edit project details
- **Timeline Management**: Manage project timelines
- **Project Analytics**: View project performance
- **Status Management**: Update project status

### **📤 Media Library**
- **All Media**: View all uploaded files
- **Upload Files**: Add new media files
- **Organize Media**: Organize files into folders
- **Search & Filter**: Find specific media files
- **Edit Metadata**: Update file information
- **Media Analytics**: View media usage statistics

### **👥 User Management**
- **All Users**: View and manage all users
- **Create User**: Add new team members
- **User Editor**: Edit user information
- **Role Assignment**: Assign user roles
- **Permission Management**: Manage user permissions
- **User Activity**: Monitor user actions
- **Bulk Operations**: Perform bulk user actions
- **User Analytics**: View user statistics

### **⚙️ System Management**
- **General Settings**: Configure system settings
- **Navigation Management**: Edit site navigation
- **Backup & Restore**: System backup tools
- **System Health**: Monitor system status
- **System Analytics**: View system performance
- **Performance Monitor**: Track system performance
- **Error Logs**: View system error logs
- **Cache Management**: Manage system cache

### **📈 Analytics & Reports**
- **System Overview**: Overall system analytics
- **Content Analytics**: Page and content performance
- **User Analytics**: User behavior and activity
- **Project Analytics**: Project performance metrics
- **Media Analytics**: Media usage statistics
- **Performance Analytics**: System performance data
- **Custom Reports**: Create custom analytics reports

---

## **🔧 Technical Setup**

### **Prerequisites:**
1. **Node.js** installed (v18 or higher)
2. **Database** properly configured
3. **Authentication system** working
4. **User account** with admin/super_admin role

### **Development Server:**
```bash
# Start the development server
npm run dev

# Access the website
http://localhost:3000

# Access the CMS directly
http://localhost:3000/admin
```

### **Database Setup:**
```bash
# The database will be automatically initialized
# when you first run the application
npm run dev
```

### **Create Super Admin:**
```bash
# Run the super admin creation script
npx ts-node scripts/create-super-admin.ts
```

---

## **🚨 Troubleshooting**

### **Can't Access Admin Panel?**
1. **Check if you're logged in** - You must be authenticated
2. **Verify your role** - Must be admin or super_admin
3. **Check the URL** - Ensure you're going to `/admin`
4. **Clear browser cache** - Try refreshing the page
5. **Check console errors** - Look for any JavaScript errors

### **Admin Panel Not Showing in Navigation?**
1. **Ensure you're logged in** with admin/super_admin role
2. **Check user role** in your account settings
3. **Refresh the page** to update navigation
4. **Clear browser cache** and try again

### **Getting Redirected Away?**
1. **Check authentication status** - You must be logged in
2. **Verify user role** - Must have admin or super_admin role
3. **Check browser console** for error messages
4. **Try logging out and back in**

### **Database Issues?**
1. **Check database connection** - Ensure database is running
2. **Verify database schema** - Tables should be created
3. **Check migration status** - All migrations should be applied
4. **Restart the server** - Try `npm run dev` again

---

## **📞 Support**

### **If You Need Help:**
1. **Check this guide** for common solutions
2. **Review the CMS Implementation Plan** for technical details
3. **Check browser console** for error messages
4. **Verify your user role** and permissions
5. **Ensure all prerequisites** are met

### **Common Issues:**
- **"Access Denied"** - Check your user role
- **"Page Not Found"** - Verify the URL is correct
- **"Database Error"** - Check database connection
- **"Authentication Failed"** - Try logging in again

---

**🎉 The CMS is now fully functional and ready for use!**

**Last Updated:** [Current Date]
**Status:** All features operational
**Access:** Available for admin and super_admin users 