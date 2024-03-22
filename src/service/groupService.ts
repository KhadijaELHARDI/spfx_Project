import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import  { SiteGroup } from '../model/groupModel';

const sp = spfi(undefined);


const getAllSiteGroups = async (): Promise<SiteGroup[]> => {
    try {
        const groups = await sp.web.siteGroups();
        return groups;
    } catch (error) {
        console.error('Erreur lors de la récupération des groupes de sites :', error);
        throw error;
    }
};

const getAssociatedGroups = async (): Promise<{ visitorGroup: SiteGroup, memberGroup: SiteGroup, ownerGroup: SiteGroup }> => {
    try {
        const visitorGroup = await sp.web.associatedVisitorGroup();
        const memberGroup = await sp.web.associatedMemberGroup();
        const ownerGroup = await sp.web.associatedOwnerGroup();
        return { visitorGroup, memberGroup, ownerGroup };
    } catch (error) {
        console.error('Erreur lors de la récupération des groupes associés :', error);
        throw error;
    }
};

const createDefaultAssociatedGroups = async (ownerEmail: string, copyRoleAssignments: boolean, clearSubScopes: boolean): Promise<void> => {
    try {
        await sp.web.createDefaultAssociatedGroups(ownerEmail, copyRoleAssignments.toString(), clearSubScopes);
    } catch (error) {
        console.error('Erreur lors de la création des groupes associés par défaut :', error);
        throw error;
    }
};


const createNewSiteGroup = async (groupName: string): Promise<void> => {
    try {
        await sp.web.siteGroups.add({ "Title": groupName });
    } catch (error) {
        console.error('Erreur lors de la création d\'un nouveau groupe de site :', error);
        throw error;
    }
};

const updateSiteGroup = async (groupId: number, updates: any): Promise<void> => {
    try {
        await sp.web.siteGroups.getById(groupId).update(updates);
    } catch (error) {
        console.error('Erreur lors de la mise à jour d\'un groupe de site :', error);
        throw error;
    }
};

const deleteSiteGroupById = async (groupId: number): Promise<void> => {
    try {
        await sp.web.siteGroups.removeById(groupId);
    } catch (error) {
        console.error('Erreur lors de la suppression d\'un groupe de site par ID :', error);
        throw error;
    }
};

const deleteSiteGroupByName = async (groupName: string): Promise<void> => {
    try {
        await sp.web.siteGroups.removeByLoginName(groupName);
    } catch (error) {
        console.error('Erreur lors de la suppression d\'un groupe de site par nom :', error);
        throw error;
    }
};

const getAllUsersOfGroup = async (groupId: number): Promise<any[]> => {
    try {
        const users = await sp.web.siteGroups.getById(groupId).users();
        return users;
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les utilisateurs d\'un groupe :', error);
        throw error;
    }
};

const updateOwnerOfGroup = async (groupId: number, ownerId: number): Promise<void> => {
    try {
        await sp.web.siteGroups.getById(groupId).setUserAsOwner(ownerId);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du propriétaire d\'un groupe :', error);
        throw error;
    }
};

export {
    getAllSiteGroups,
    getAssociatedGroups,
    createDefaultAssociatedGroups,
    createNewSiteGroup,
    updateSiteGroup,
    deleteSiteGroupById,
    deleteSiteGroupByName,
    getAllUsersOfGroup,
    updateOwnerOfGroup
};
