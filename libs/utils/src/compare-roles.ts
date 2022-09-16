import { Role, rolesByImportance } from '@nx-vnts/shared';

export function compareRoles(role1: Role, role2: Role): number {
    if (rolesByImportance.indexOf(role1) > rolesByImportance.indexOf(role2)) return 1;
    else if (rolesByImportance.indexOf(role1) === rolesByImportance.indexOf(role2)) return 0;
    else return -1;
}
