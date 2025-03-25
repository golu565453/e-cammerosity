
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Plus, Database, Settings, Shield } from "lucide-react";
import AdminProducts from '../components/admin/AdminProducts';
import AdminCategories from '../components/admin/AdminCategories';
import AdminSettings from '../components/admin/AdminSettings';

export default function Admin() {
  const [activeSection, setActiveSection] = useState<string>('products');

  return (
    <>
      <Helmet>
        <title>Admin Panel | ELEGANCE</title>
      </Helmet>
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar>
            <SidebarHeader className="flex items-center px-4 py-2">
              <h2 className="text-lg font-bold">Admin Panel</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection('products')}
                        isActive={activeSection === 'products'}
                      >
                        <Database className="w-4 h-4" />
                        <span>Products</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection('categories')}
                        isActive={activeSection === 'categories'}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Categories</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection('settings')}
                        isActive={activeSection === 'settings'}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset>
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                <SidebarTrigger />
              </div>
              
              {activeSection === 'products' && <AdminProducts />}
              {activeSection === 'categories' && <AdminCategories />}
              {activeSection === 'settings' && <AdminSettings />}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
