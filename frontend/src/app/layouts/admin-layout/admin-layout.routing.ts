import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AboutComponent } from 'app/about/about.component';
import { ViewDataComponent } from 'app/view-data/view-data.component';
import { TrainModelComponent } from 'app/train-model/train-model.component';
import { TestModelComponent } from 'app/test-model/test-model.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'about',          component: AboutComponent },
    { path: 'about',          component: AboutComponent },
    { path: 'view-data',      component: ViewDataComponent },
    { path: 'train-model',    component: TrainModelComponent },
    { path: 'test-model',     component: TestModelComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
