$.extend(framework.createNamespace('framework.common.links'), {
    Id: {
        RoomOrderInput: 127002,
        CashMustPayInput: 82,
        CashMustReceiveInput: 83,
        CashPayInput: 84,
        CashReceiveInput: 85,
        SaleInput: 86,
        PurchaseInput: 87,
        InBoundInput: 88,
        OutBoundInput: 89,
        InventoryBalanceInput: 63,
    },
    openWindow: function (functionitemid, url, id) {
        var links = framework.common.links;
        if (functionitemid == links.Id.RoomOrderInput) {
            this.openPopup({
                pageName: 'roomOrderInput',
                url: url,
                width: 926,
                autoResize: true
            }, {
                RoomOrderId: id,
                EditFlag: 'M'
            });
        }
        else if (functionitemid == links.Id.SaleInput) {
            this.openPopup({
                pageName: 'saleInput',
                url: url,
                width: 926,
                autoResize: true
            }, {
                SaleKey: {
                    SaleId: id
                },
                EditFlag: 'M'
            });
        }
        else if (functionitemid == links.Id.PurchaseInput) {
            this.openPopup({
                pageName: 'purchaseInput',
                url: url,
                width: 926,
                autoResize: true
            }, {
                PurchaseKey: {
                    PurchaseId: id
                },
                EditFlag: 'M'
            });
        }
        else if (functionitemid == links.Id.CashMustReceiveInput) {
            this.openPopup({
                pageName: 'cashMustReceiveInput',
                url: url,
                width: 700,
                autoResize: true
            }, {
                CashMustReceiveId: id,
                EditFlag: 'M'
            });
        }
        else if (functionitemid == links.Id.CashMustPayInput) {
            this.openPopup({
                pageName: 'cashMustPayInput',
                url: url,
                width: 700,
                autoResize: true
            }, {
                CashMustPayId: id,
                EditFlag: 'M'
            });
        }
        else if (functionitemid == links.Id.InventoryBalanceInput) {
            this.openPopup({
                pageName: 'inventoryBalanceInput',
                url: url,
                width: 926,
                autoResize: true
            }, {
                InventoryBalanceId: id,
                EditFlag: 'M'
            });
        }
    },

});