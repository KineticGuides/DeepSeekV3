import { Routes } from '@angular/router';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { ResolverService } from './resolver.service';
import { TemplateListComponent } from './pages/template-list/template-list.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { MenuListComponent } from './pages/crud/cmm_menu/menu-list/menu-list.component';
import { MenuItemListComponent } from './pages/crud/cmm_menu_item/menu-item-list/menu-item-list.component';
import { PracticeListComponent } from './pages/crud/cmm_practice/practice-list/practice-list.component';
import { TableListComponent } from './pages/crud/cmm_table/table-list/table-list.component';
import { TableItemListComponent } from './pages/crud/cmm_table/table-item-list/table-item-list.component';
import { UserListComponent } from './pages/crud/user/user-list/user-list.component';
import { IncomingPhoneListComponent } from './pages/crud/incoming_phone/incoming-phone-list/incoming-phone-list.component';
import { OperatorListComponent } from './pages/crud/operator/operator-list/operator-list.component';
import { KnownCallerListComponent } from './pages/crud/known_caller/known-caller-list/known-caller-list.component';
import { PracticeContactListComponent } from './pages/crud/practice_contact/practice-contact-list/practice-contact-list.component';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserActivityListComponent } from './pages/crud/user_activity/user-activity-list/user-activity-list.component';
import { UserMessageListComponent } from './pages/crud/user_message/user-message-list/user-message-list.component';
import { ProviderListComponent } from './pages/crud/provider/provider-list/provider-list.component';
import { ResourceListComponent } from './pages/crud/resource/resource-list/resource-list.component';
import { ResourceDayCalendarComponent } from './pages/resource-day-calendar/resource-day-calendar.component';
import { SingleResourceCalendarComponent } from './pages/single-resource-calendar/single-resource-calendar.component';
import { ApptListComponent } from './pages/crud/appt/appt-list/appt-list.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanySetupComponent } from './pages/company-setup/company-setup.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MarkerListComponent } from './admin-pages/marker-list/marker-list.component';
import { MemberEncounterListComponent } from './member-sections/member-encounter-list/member-encounter-list.component';
import { MemberNoteListComponent } from './member-sections/member-note-list/member-note-list.component';
import { MemberTestListComponent } from './member-sections/member-test-list/member-test-list.component';
import { MemberMedsListComponent } from './member-sections/member-meds-list/member-meds-list.component';
import { MemberOrderListComponent } from './member-sections/member-order-list/member-order-list.component';
import { GeneralMedicalChatbotComponent } from './chatbots/general-medical-chatbot/general-medical-chatbot.component';
import { LongevityChatbotComponent } from './chatbots/longevity-chatbot/longevity-chatbot.component';
import { DietexerciseChatbotComponent } from './chatbots/dietexercise-chatbot/dietexercise-chatbot.component';
import { SkincareChatbotComponent } from './chatbots/skincare-chatbot/skincare-chatbot.component';
import { MemberDashboardComponent } from './dashboards/member-dashboard/member-dashboard.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

export const routes: Routes = [  
    { path: '', component: HomePageComponent, resolve: { data: ResolverService} },
    { path: 'home', component: GeneralMedicalChatbotComponent, resolve: { data: ResolverService} },
    { path: 'general', component: GeneralMedicalChatbotComponent, resolve: { data: ResolverService} },
    { path: 'orders', component: OrderListComponent, resolve: { data: ResolverService} },
    { path: 'longevity', component: LongevityChatbotComponent, resolve: { data: ResolverService} },
    { path: 'diet-exercise', component: DietexerciseChatbotComponent, resolve: { data: ResolverService} },
    { path: 'skincare', component: SkincareChatbotComponent, resolve: { data: ResolverService} },
    { path: 'login', component: LoginPageComponent, resolve: { data: ResolverService} },
    { path: 'marker-list', component: MarkerListComponent, resolve: { data: ResolverService}  },
    { path: 'members', component: MemberListComponent, resolve: { data: ResolverService} },
    { path: 'admin', component: AdminComponent, resolve: { data: ResolverService} },
    { path: 'settings', component: SettingsComponent, resolve: { data: ResolverService} },
    { path: 'companies', component: CompaniesComponent, resolve: { data: ResolverService} },
    { path: 'company', component: CompanySetupComponent, resolve: { data: ResolverService} },
    { path: 'contacts', component: PracticeContactListComponent, resolve: { data: ResolverService} },
    { path: 'user-messages', component: UserMessageListComponent, resolve: { data: ResolverService} },
    { path: 'member-encounter-list', component: MemberEncounterListComponent, resolve: { data: ResolverService} },
    { path: 'member-note-list', component: MemberNoteListComponent, resolve: { data: ResolverService} },
    { path: 'member-test-list', component: MemberTestListComponent, resolve: { data: ResolverService} },
    { path: 'member-meds-list', component: MemberMedsListComponent, resolve: { data: ResolverService} },
    { path: 'member-order-list', component: MemberOrderListComponent, resolve: { data: ResolverService} },
    { path: 'known-caller', component: KnownCallerListComponent, resolve: { data: ResolverService} },
    { path: 'providers', component: ProviderListComponent, resolve: { data: ResolverService} },
    { path: 'incoming-phone', component: IncomingPhoneListComponent, resolve: { data: ResolverService} },
    { path: 'calendar', component: TemplateHomeComponent, resolve: { data: ResolverService} },
    { path: 'resource-calendar', component: ResourceDayCalendarComponent, resolve: { data: ResolverService} },
    { path: 'day-calendar', component: SingleResourceCalendarComponent, resolve: { data: ResolverService} },
    { path: 'appts', component: ApptListComponent, resolve: { data: ResolverService} },
    { path: 'members', component: MemberListComponent, resolve: { data: ResolverService} },
    { path: 'resources', component: ResourceListComponent, resolve: { data: ResolverService} },
    { path: 'member-dashboard/:id', component: MemberDashboardComponent, resolve: { data: ResolverService} },
    { path: 'template-list', component: TemplateListComponent, resolve: { data: ResolverService}  }
];
