export interface IRental {
    id: number;
    clientId: number;
    equipmentId: number;
    rentalStartDate: Date | null;
    rentalEndDate: Date | null;
    totalCost: number;
    paymentId: number;
    payment: IPayments;
    description: string | null;
    status: string;
    createdAt: Date;
    client: IClients;
    equipment: IEquipment;
}

export interface IEquipment {
    id:            number;
    model:         string;
    serialNumber:  string;
    currentStatus: string;
    placa:         string;
    createdAt:     Date;
}

export interface IClients {
    id: number;
    name: string;
    lastname: string;
    rif: string;
    phone: string;
    email: string;
    address: string;
    createdAt: Date;
}

export interface IPayments {
    id:       number;
    bank:     string;
    identify: string;
    email:    string;
    phone:    string;
    owner:    string;
    type:     string;
}

export interface IMaintenance {
    id: number;
    equipmentId: number;
    equipmentClient?: string;
    sparePartId: number;
    clientId?: number;
    type: string;
    status: string;
    description: string;
    maintenanceDate: Date;
    maintenanceDateEnd: Date;
    createdAt: Date;
    equipment: IEquipment;
    client?: IClients;
}