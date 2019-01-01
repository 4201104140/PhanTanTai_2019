var popupField = {
    'popupDepartmentList': {
        width: 800,
        pageName: 'DepartmentList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'DepartmentId',
        textPropertyName: 'DepartmentName',
        pageListPopupUrl: '/UIDataSettingMgt/Department/DepartmentList',
        executeSearchUrl: '/UIDataSettingMgt/Department/DepartmentExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    DepartmentName: inputText,
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.DepartmentId,
                inputText: dataMessage.DepartmentName
            };
        }
    },
    'popupJobPositionList': {
        width: 1000,
        pageName: 'JobPositionList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIEmployee/JobPosition/JobPositionList',
        executeSearchUrl: '/UIEmployee/JobPosition/JobPositionExecuteSearch',
        width: 1000,
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            
            return {
                inputId: dataMessage.JobPositionId,
                inputText: dataMessage.JobName
            };;
        }
    },
    'popupApplicationGroup': {
        width: 1000,
        pageName: 'ApplicationGroupList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/ApplicationGroup/ApplicationGroupList',
        executeSearchUrl: '/RetailSecurity/ApplicationGroup/ApplicationGroupExecuteSearch',
        width: 1000,
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ApplicationGroupId,
                inputText: dataMessage.Name
            };;
        }
    },
    'popupProductList': {
        width: 1000,
        pageName: 'ProductList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'ProductId',
        textPropertyName: 'ProductName',
        pageListPopupUrl: '/RetailProduct/ProductHandler/ProductList',
        executeSearchUrl: '/RetailProduct/ProductHandler/ProductExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText,
                    CurrentPage: 1
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ProductId,
                inputText: dataMessage.Name
            };
        }
    },
    'popupTypeReceiveList': {
        width: 700,
        pageName: 'TypeReceiveList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'TypeReceiveId',
        textPropertyName: 'TypeReceiveName',
        pageListPopupUrl: '/UIAccountMgt/TypeReceive/TypeReceiveList',
        executeSearchUrl: '/UIAccountMgt/TypeReceive/TypeReceiveExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    TypeReceiveName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.TypeReceiveId,
                inputText: dataMessage.TypeReceiveName
            };
        }
    },
    'popupTypeMustReceiveList': {
        width: 700,
        pageName: 'TypeMustReceiveList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'TypeMustReceiveId',
        textPropertyName: 'TypeMustReceiveName',
        pageListPopupUrl: '/UIAccountMgt/TypeMustReceive/TypeMustReceiveList',
        executeSearchUrl: '/UIAccountMgt/TypeMustReceive/TypeMustReceiveExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    TypeMustReceiveName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.TypeMustReceiveId,
                inputText: dataMessage.TypeMustReceiveName
            };
        }
    },
    'popupTypePayList': {
        width: 700,
        pageName: 'TypePayList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'TypePayId',
        textPropertyName: 'TypePayName',
        pageListPopupUrl: '/UIAccountMgt/TypePay/TypePayList',
        executeSearchUrl: '/UIAccountMgt/TypePay/TypePayExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    TypePayName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.TypePayId,
                inputText: dataMessage.TypePayName
            };
        }
    },
    'popupTypeMustPayList': {
        width: 700,
        pageName: 'TypeMustPayList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'TypeMustPayId',
        textPropertyName: 'TypeMustPayName',
        pageListPopupUrl: '/UIAccountMgt/TypeMustPay/TypeMustPayList',
        executeSearchUrl: '/UIAccountMgt/TypeMustPay/TypeMustPayExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    TypeMustPayName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.TypeMustPayId,
                inputText: dataMessage.TypeMustPayName
            };
        }
    },
    'popupProductLocationMapList': {
        width: 800,
        pageName: 'ProductLocationMapList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'LocationId',
        textPropertyName: 'ProductName',
        pageListPopupUrl: '/RetailProduct/ProductLocationMap/ProductLocationMapList',
        executeSearchUrl: '/RetailProduct/ProductLocationMap/ProductLocationMapExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText,
                    CurrentPage: 1
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ProductId,
                inputText: dataMessage.Name
            };
        }
    },
    'popupShopLocationList': {
        width: 800,
        pageName: 'LocationList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'LocationId',
        textPropertyName: 'LocationName',
        pageListPopupUrl: '/UIInventoryMgt/Location/LocationList',
        executeSearchUrl: '/UIInventoryMgt/Location/LocationExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    LocationName: inputText,
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.LocationId,
                inputText: dataMessage.LocationName
            };
        }
    },
    'popupRoomPriceTypeList': {
        width: 800,
        pageName: 'RoomPriceTypeList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'RoomPriceTypeId',
        textPropertyName: 'LocationName',
        pageListPopupUrl: '/UIOfficeMgt/RoomPrice/RoomPriceType',
        executeSearchUrl: '/UIOfficeMgt/RoomPrice/RoomPriceTypeExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    RoomPriceTypeName: inputText,
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.RoomPriceTypeId,
                inputText: dataMessage.RoomPriceTypeName
            };
        }
    },

    'popupShopList': {
        width: 1000,
        pageName: 'ShopList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'ShopId',
        textPropertyName: 'Name',
        pageListPopupUrl: '/RetailShop/Shop/ShopList',
        executeSearchUrl: '/RetailShop/Shop/ShopExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ShopId,
                inputText: dataMessage.Name
            };
        }
    },
    'popupVehicleList': {
        width: 1000,
        pageName: 'VehicleList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'VehicleId',
        textPropertyName: 'VehicleNo',
        pageListPopupUrl: '/RetailCustomer/VehicleMgt/VehicleList',
        executeSearchUrl: '/RetailCustomer/VehicleMgt/VehicleExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.VehicleId,
                inputText: dataMessage.VehicleNo
            };
        }
    },
    'popupQuotationList': {
        width: 1000,
        pageName: 'QuotationList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'QuotationId',
        textPropertyName: 'QuotationCode',
        pageListPopupUrl: '/UIInventoryMgt/Quotation/QuotationList',
        executeSearchUrl: '/UIInventoryMgt/Quotation/QuotationExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuotationId,
                inputText: dataMessage.QuotationCode
            };
        }
    },

    'popupPostGroupList': {
        width: 800,
        pageName: 'PostGroupList',
        placeholderText: 'Tìm theo tên nhóm',
        idPropertyName: 'PostGroupId',
        textPropertyName: 'PostGroupName',
        pageListPopupUrl: '/UIWorkingThreadMgt/PostGroup/PostGroupList',
        executeSearchUrl: '/UIWorkingThreadMgt/PostGroup/PostGroupExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    PostGroupName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.PostGroupId,
                inputText: dataMessage.PostGroupName
            };
        }
    },
    'popupPostStatusList': {
        width: 800,
        pageName: 'PostStatusList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'PostStatusId',
        textPropertyName: 'PostStatusName',
        pageListPopupUrl: '/UIWorkingThreadMgt/PostStatus/PostStatusList',
        executeSearchUrl: '/UIWorkingThreadMgt/PostStatus/PostStatusExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    PostStatusName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.PostStatusId,
                inputText: dataMessage.PostStatusName
            };
        }
    },
    'popupFileGroupList': {
        width: 800,
        pageName: 'FileGroupList',
        placeholderText: 'Tìm theo tên nhóm',
        idPropertyName: 'FileGroupId',
        textPropertyName: 'FileGroupName',
        pageListPopupUrl: '/UIFileMgt/FileGroup/FileGroupList',
        executeSearchUrl: '/UIFileMgt/FileGroup/FileGroupExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    FileGroupName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FileGroupId,
                inputText: dataMessage.FileGroupName
            };
        }
    },
    'popupFileExtensionList': {
        width: 800,
        pageName: 'FileExtensionList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'FileExtensionId',
        textPropertyName: 'FileExtensionName',
        pageListPopupUrl: '/UIFileMgt/FileExtension/FileExtensionList',
        executeSearchUrl: '/UIFileMgt/FileExtension/FileExtensionExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    FileExtensionName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FileExtensionId,
                inputText: dataMessage.FileExtensionName
            };
        }
    },
    'popupFileList': {
        width: 800,
        pageName: 'FileList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'FileId',
        textPropertyName: 'FileName',
        pageListPopupUrl: '/UIFileMgt/File/FileList',
        executeSearchUrl: '/UIFileMgt/File/FileExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    FileName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FileId,
                inputText: dataMessage.FileName
            };
        }
    },
    'popupProjectList': {
        width: 800,
        pageName: 'ProjectList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'ProjectId',
        textPropertyName: 'ProjectName',
        pageListPopupUrl: '/UIDataSettingMgt/Project/ProjectList',
        executeSearchUrl: '/UIDataSettingMgt/Project/ProjectExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ProjectName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ProjectId,
                inputText: dataMessage.ProjectName
            };
        }
    },
    'popupCategoryList': {
        width: 800,
        pageName: 'CategoryList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailProduct/Category/CategoryList',
        executeSearchUrl: '/RetailProduct/Category/CategoryExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CategoryId,
                inputText: dataMessage.Name
            };;
        }
    },
    'popupLocationList': {
        width: 800,
        pageName: 'LocationList',
        placeholderText: 'Tìm theo quận huyện',
        pageListPopupUrl: '/Documents/Location/LocationList',
        executeSearchUrl: '/Documents/Location/LocationExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Quicksearch: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.DistrictId + ' - ' + dataMessage.ProvinceId,
                inputText: dataMessage.Name
            };;
        }
    },
    'popupCustomerGroupList': {
        width: 800,
        pageName: 'CustomerGroupList',
        placeholderText: 'Tìm theo tên nhóm',
        pageListPopupUrl: '/RetailCustomerGroup/CustomerGroup/CustomerGroupList',
        executeSearchUrl: '/RetailCustomerGroup/CustomerGroup/CustomerGroupExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CustomerGroupId,
                inputText: dataMessage.Name
            };;
        }
    },
    'popupMerchantList': {
        width: 1000,
        pageName: 'MerchantList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/Merchant/MerchantList',
        executeSearchUrl: '/RetailSecurity/Merchant/MerchantExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.MerchantId,
                inputText: dataMessage.Name
            };;
        }
    },
    'popupFunctionItemList': {
        width: 1000,
        pageName: 'FunctionItemList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/FunctionItem/FunctionItemList',
        executeSearchUrl: '/RetailSecurity/FunctionItem/FunctionItemExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    FunctionItemName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FunctionItemId,
                inputText: dataMessage.FunctionItemName
            };;
        }
    },
    'popupFunctionGroupList': {
        width: 800,
        pageName: 'FunctionGroupList',
        placeholderText: 'Tìm theo tên nhóm',
        pageListPopupUrl: '/RetailSecurity/FunctionGroup/FunctionGroupList',
        executeSearchUrl: '/RetailSecurity/FunctionGroup/FunctionGroupExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    FunctionGroupName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FunctionGroupId,
                inputText: dataMessage.FunctionGroupName
            };;
        }
    },
    'popupApplicationList': {
        width: 800,
        pageName: 'ApplicationList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/Application/ApplicationList',
        executeSearchUrl: '/RetailSecurity/Application/ApplicationExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ApplicationName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ApplicationId,
                inputText: dataMessage.ApplicationName
            };;
        }
    },
    'popupApplicationMenuList': {
        width: 800,
        pageName: 'ApplicationMenuList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/ApplicationMenu/ApplicationMenuList',
        executeSearchUrl: '/RetailSecurity/ApplicationMenu/ApplicationMenuExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ApplicationMenuName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ApplicationMenuId,
                inputText: dataMessage.ApplicationMenuName
            };;
        }
    },
    'popupEmployeeList': {
        width: 1000,
        pageName: 'EmployeeList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIEmployee/Employee/EmployeeList',
        executeSearchUrl: '/UIEmployee/Employee/EmployeeExecuteSearch',
        width:1000,
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            
            return {
                inputId: dataMessage.EmployeeId,
                inputText: dataMessage.EmployeeName
            };;
        }
    },
    'popupEmployeeAdminList': {
        width: 1000,
        pageName: 'EmployeeAdminList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIEmployee/EmployeeAdmin/EmployeeAdminList',
        executeSearchUrl: '/UIEmployee/EmployeeAdmin/EmployeeAdminExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.EmployeeId,
                inputText: dataMessage.EmployeeName
            };;
        }
    },
    'popupCustomerList': {
        width: 1000,
        pageName: 'CustomerList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'CustomerId',
        textPropertyName: 'CustomerName',
        pageListPopupUrl: '/RetailCustomer/Customer/CustomerList',
        executeSearchUrl: '/RetailCustomer/Customer/CustomerExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Name: inputText,
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CustomerId,
                inputText: dataMessage.Name
            };
        }
    },
    'popupCodeTypeList': {
        width: 800,
        pageName: 'CodeTypeList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'CodeTypeId',
        textPropertyName: 'CodeTypeName',
        pageListPopupUrl: '/UICommonMgt/CodeType/CodeTypeList',
        executeSearchUrl: '/UICommonMgt/CodeType/CodeTypeExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    CodeTypeName: inputText,
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CodeTypeId,
                inputText: dataMessage.CodeTypeName
            };
        }
    },
    'popupCodeTypeDataList': {
        width: 800,
        pageName: 'CodeTypeDataList',
        placeholderText: 'Tìm theo tên',
        idPropertyName: 'CodeTypeDataId',
        textPropertyName: 'CodeTypeDataName',
        pageListPopupUrl: '/UICommonMgt/CodeTypeData/CodeTypeDataList',
        executeSearchUrl: '/UICommonMgt/CodeTypeData/CodeTypeDataExecuteSearch',
        setParam: function (inputText, options) {
            return {
                CommandAction: {
                    CodeTypeDataName: inputText,
                    CodeTypeId: options.CodeTypeId
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CodeTypeDataId,
                inputText: dataMessage.CodeTypeDataName
            };
        }
    },
    'popupSubjectList': {
        width: 800,
        pageName: 'SubjectList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/Subject/SubjectList',
        executeSearchUrl: '/UITestMgt/Subject/SubjectExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    SubjectId: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.SubjectId,
                inputText: dataMessage.SubjectName
            }
        }

    },
    'popupQuestionLevelList': {
        width: 800,
        pageName: 'QuestionLevelList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/QuestionLevel/QuestionLevelList',
        executeSearchUrl: '/UITestMgt/QuestionLevel/QuestionLevelExecuteSearch',
        setParam: function (inputText) {
        return {
        		CommandAction: {
        			QuestionLevelId: inputText,
					QuestionGroupId: 1
        		}
        	}
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuestionLevelId,
                inputText: dataMessage.QuestionLevelName
            }
        }

    },
    'popupQuestionPartList': {
        width: 800,
        pageName: 'QuestionPartList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/QuestionPart/QuestionPartList',
        executeSearchUrl: '/UITestMgt/QuestionPart/QuestionPartExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuestionPartId: inputText,
                    QuestionGroupId: 1
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuestionPartId,
                inputText: dataMessage.QuestionPartContent
            }
        }

    },
    'popupQuestionGroupList': {
        width: 800,
        pageName: 'QuestionGroupList',
        placeholderText: 'Tìm theo tên nhóm',
        pageListPopupUrl: '/UITestMgt/QuestionGroup/QuestionGroupList',
        executeSearchUrl: '/UITestMgt/QuestionGroup/QuestionGroupExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuestionGroupId: 1
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuestionGroupId,
                inputText: dataMessage.QuestionGroupName
            }
        }
    },
    'popupExamStatusList': {
        width: 800,
        pageName: 'ExamStatusList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/ExamStatus/ExamStatusList',
        executeSearchUrl: '/UITestMgt/ExamStatus/ExamStatusExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ExamStatusId: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ExamStatusId,
                inputText: dataMessage.ExamStatusName
            }
        }
    },
    'popupStudentList': {
        width: 800,
        pageName: 'StudentList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/Student/StudentList',
        executeSearchUrl: '/UITestMgt/Student/StudentExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    StudentName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.StudentId,
                inputText: dataMessage.StudentName
            };;
        }
    },
    'popupUserList': {
        width: 1000,
        pageName: 'UserList',
        placeholderText: 'Tìm theo tên đăng nhập',
        pageListPopupUrl: '/RetailSecurity/User/UserList',
        executeSearchUrl: '/RetailSecurity/User/UserExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Username: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.UserId,
                inputText: dataMessage.Username
            };;
        }
    },
    'popupUserAdminList': {
        width: 1000,
        pageName: 'UserAdminList',
        placeholderText: 'Tìm theo tên đăng nhập',
        pageListPopupUrl: '/RetailSecurity/UserAdmin/UserAdminList',
        executeSearchUrl: '/RetailSecurity/UserAdmin/UserAdminExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    Username: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.UserId,
                inputText: dataMessage.Username
            };;
        }
    },
    'popupIconList': {
        width: 800,
        pageName: 'IconList',
        placeholderText: 'Tìm theo mã',
        pageListPopupUrl: '/RetailSecurity/Icon/IconList',
        executeSearchUrl: '/RetailSecurity/Icon/IconExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.IconId,
                inputText: dataMessage.IconName
            };;
        }
    },
    'popupQuestionStatusList': {
        width: 800,
        pageName: 'QuestionStatusList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/QuestionStatus/QuestionStatusList',
        executeSearchUrl: '/UITestMgt/QuestionStatus/QuestionStatusExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuestionSatusId: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuestionStatusId,
                inputText: dataMessage.QuestionStatusName
            }
        }
    },
    'popupGridConfigList': {
        width: 1000,
        noSearch: false,
        pageName: 'GridConfigList',
        placeholderText: 'Tìm theo tên cột',
        pageListPopupUrl: '/UICommonMgt/GridConfig/GridConfigList',
        //executeSearchUrl: '/UITestMgt/QuestionStatus/GridConfigList',
        setParam: function (inputText) {
            return {
                CommandAction: {
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.FieldId,
                inputText: dataMessage.field
            }
        }
    },
    'popupGridConfigTemplateList': {
        width: 1000,
        pageName: 'GridConfigTemplateList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UICommonMgt/GridConfigTemplate/GridConfigTemplateList',
        executeSearchUrl: '/UICommonMgt/GridConfigTemplate/GridConfigTemplateExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ConfigName: inputText
                }
            };
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ConfigId + ' - ' + dataMessage.BusinessTypeId, // id từ record được chọn từ popup
                inputText: dataMessage.ConfigName + ' - ' + dataMessage.BusinessTypeId
            };;
        }
    },
    'popupRoomList': {
        width: 1000,
        pageName: 'RoomList',
        placeholderText: 'Tìm theo tên phòng',
        pageListPopupUrl: '/UIOfficeMgt/Room/RoomList',
        executeSearchUrl: '/UIOfficeMgt/Room/RoomExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.RoomId,
                inputText: dataMessage.RoomName
            }
        }
    },
    'popupCertificateList': {
        width: 800,
        pageName: 'CertificateList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/Certificate/CertificateList',
        executeSearchUrl: '/UITestMgt/Certificate/CertificateExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.CertificateId,
                inputText: dataMessage.CertificateName
            }
        }
    },
    'popupUserToStudentList': {
        width: 800,
        pageName: 'UserToStudentList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/User/UserToStudentList',
        executeSearchUrl: '/RetailSecurity/User/UserExecuteSearchForStudent',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.UserId,
                inputText: dataMessage.StudentName
            }
        }
    },
    'popupUserToMemberList': {
        width: 1000,
        pageName: 'UserToEmployeeList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/RetailSecurity/User/UserToEmployeeList',
        executeSearchUrl: '/RetailSecurity/User/UserExecuteSearchForEmployee',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                } 
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.UserId,
                inputText: dataMessage.EmployeeName
            }
        }
    },
    'popupScheduleDataList': {
        width: 1000,
        pageName: 'ScheduleDataList',
        placeholderText: 'Tìm theo tên phòng',
        pageListPopupUrl: '/UIOfficeMgt/ScheduleData/ScheduleDataList',
        executeSearchUrl: '/UIOfficeMgt/ScheduleData/ScheduleDataExecuteSearch',
        setParam: function (inputText) {

            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ScheduleDataId,
                inputText: dataMessage.Title
            }
        }
    },
    'popupQuestionTypeList': {
        width: 800,
        pageName: 'QuestionTypeList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UITestMgt/QuestionType/QuestionTypeList',
        executeSearchUrl: '/UITestMgt/QuestionType/QuestionTypeExecuteSearch',
        setParam: function (inputText) {

            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.QuestionTypeId,
                inputText: dataMessage.QuestionTypeName
            }
        }
    },
     'popupBankList': {
        width: 800,
        pageName: 'BankList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIAccountMgt/Bank/BankList',
        executeSearchUrl: '/UIAccountMgt/Bank/BankExecuteSearch',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.BankId,
                inputText: dataMessage.BankName
            }
        }
    },
    'popupAccountList': {
        width: 800,
        pageName: 'AccountList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIAccountMgt/Account/AccountList',
        executeSearchUrl: '/UIAccountMgt/Account/AccountExecuteSearch',
        height: '600',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    QuickSearch: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.AccountId,
                inputText: dataMessage.AccountNumber
            }
        }
    },
    'popupScheduleStatusList': {
        width: 800,
        pageName: 'ScheduleStatusList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIOfficeMgt/ScheduleStatus/ScheduleStatusList',
        executeSearchUrl: '/UIOfficeMgt/ScheduleStatus/ScheduleStatusExecuteSearch',
        height: '600',
        setParam: function (inputText) {
            return {
                CommandAction: {
                    ScheduleGroupId: inputText
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.ScheduleStatusId,
                inputText: dataMessage.ScheduleStatusName
            }
        }
    },
    'popupRoomOrderStatusList': {
        width: 800,
        pageName: 'RoomOrderStatusList',
        placeholderText: 'Tìm theo tên',
        pageListPopupUrl: '/UIRoomServiceMgt/RoomOrderStatus/RoomOrderStatusList',
        executeSearchUrl: '/UIRoomServiceMgt/RoomOrderStatus/RoomOrderStatusExecuteSearch',
        height: '600',
        setParam: function (inputText) {
            return {
                CommandAction: {
                }
            }
        },
        setInputText: function (dataMessage) {
            return {
                inputId: dataMessage.RoomOrderStatusId,
                inputText: dataMessage.RoomOrderStatusName
            }
        }
    },
};
(function initPopup() {
    $.each(popupField, function (key, popupFieldOptions) {
        createPopup(key, popupFieldOptions);
    });
})();

function createPopup(key, popupFieldOptions) {
    $().w2field('addType', key, function (options) {
        var self = this;
        //for new 
        var caller;
        if (options.callerPageId && !options.caller) {
            caller = options.callerPageId && framework.global.findPage(options.callerPageId).dataIn;
            !caller && console.log("You must provide callerPageId in options", options);
        }
        //for old
        else {
            //alert(self.type + ': Please change new method for caller')
            caller = options.caller;
        }


        $(this.el).css('width', '30%').attr('disabled', 'disabled');
        var input;
        if ($(self.el).parent().find('.inputSearch').length) {
            input = $(self.el).parent().find('.inputSearch');
            input.val('');
            input.off('keydown');
        }
        else {
            input = $('<input>').css({
                width: '65%',
                border: '0px'
            }).attr('placeholder', popupFieldOptions.placeholderText).addClass('inputSearch');
            $(this.el).parent().append(input);
        }
        if (options.inputText) {
            input.val(options.inputText);
        }
        else {
            input.val('');
        }

        var data = {
            param: {},
            name: $(self.el).attr('name'),
            pageName: popupFieldOptions.pageName,
            id: $(self.el).attr('name'),
            $el: self.el,
            field: self,
            eventType: ''
        };

        //this sau khi extend sẽ được chứa trong $(this.el).data('w2field')
        $.extend(self, {
            onMessageReceive: function (sender, message) {
                if (sender.pageName == popupFieldOptions.pageName) {
                    var dataMessage;

                    if (message.data) {
                        dataMessage = message.data[0];
                    }
                    else {
                        dataMessage = message;
                    }
                    var inputTextData = popupFieldOptions.setInputText(dataMessage);
                    $(self.el).val(inputTextData.inputId);
                    $(self.el).change();
                    $(input).val(inputTextData.inputText);
                    $(self.el).data('data', dataMessage);
                    (sender && sender.close) && sender.close();
                    data.inputValue = dataMessage[popupFieldOptions.textPropertyName];
                    caller.onChangeControl && caller.onChangeControl(data);
                }
            }
        });




        var buttonSearch, buttonRemove;
        if ($(self.el).parent().find('.buttonSearch').length) {
            buttonSearch = $(self.el).parent().find('.buttonSearch');
        }
        else {
            buttonSearch = $('<button>')
                .attr('style', 'margin-left:auto !important; font-size:small;')
                .addClass('input-icon buttonSearch')
                .append($('<span>').addClass('fa fa-search'));
            buttonSearch.insertAfter(self.el);
        }
        if ($(self.el).parent().find('.buttonRemove').length) {
            buttonRemove = $(self.el).parent().find('.buttonRemove');
        }
        else {
            buttonRemove = $('<button>')
                .attr('style', 'font-size:small;')
                .addClass('input-icon buttonRemove')
                .append($('<span>').addClass('fa fa-times'));
            buttonRemove.appendTo($(self.el).parent());
        }

        buttonSearch.click(function (e) {
            self.openedPageOptions = {};
            $.extend(data.param, popupFieldOptions.setParam(null, options));
            data.eventType = 'open';

            let isContinue = true;
            if (caller.onPopupHandler) {
                isContinue = caller.onPopupHandler(data, e);
                isContinue = typeof isContinue === "undefined" ? true : isContinue;
            }

            if (isContinue == true)
                caller.openPopup({
                    name: self.type,
                    url: popupFieldOptions.pageListPopupUrl,
                    width: data.width || (popupFieldOptions.width || 600),
                    height: data.height || (popupFieldOptions.height || 'auto'),
                    resizable: true

                }, data.param, self.openedPageOptions);

        });
        buttonRemove.click(function () {
            self.set(null);
            input.val('');
            $(self.el).change();
            if (caller) {
                data.eventType = 'remove';
                caller.onPopupHandler && caller.onPopupHandler(data);
            }
            $(self.el).data('data', null);
        });
        if (!popupFieldOptions.noSearch)
            input.on('keydown', function (e) {
                if (e.which == 13) {
                    $.extend(data.param, popupFieldOptions.setParam(input.val(), options));
                    let isContinue = true;
                    if (caller) {
                        data.eventType = 'open';
                        if (caller.onPopupHandler) {
                            isContinue = caller.onPopupHandler(data, e);
                            isContinue = typeof isContinue === "undefined" ? true : isContinue;
                        }
                    }
                    if (isContinue == true)
                        $.post(popupFieldOptions.executeSearchUrl, data.param, function (result) {
                            var records;
                            if (popupFieldOptions.setResponeData) {
                                records = popupFieldOptions.setResponeData(result);
                            }
                            else {
                                records = result.Data.Data;
                            }
                            if (records.length == 1) {
                                self.onMessageReceive(data, records[0]);
                                caller.onMessageReceive && caller.onMessageReceive(data, records[0]);
                                return;
                            }
                            else {
                                self.openedPageOptions = {};

                                caller.openPopup({
                                    name: self.type,
                                    url: popupFieldOptions.pageListPopupUrl,
                                    width: data.width || (popupFieldOptions.width || 600),
                                    height: data.height || (popupFieldOptions.height || 'auto'),
                                    resizable: true

                                }, data.param, self.openedPageOptions);
                            }
                        });
                }
            });
        buttonRemove.appendTo($(self.el).parent());
        buttonSearch.insertAfter(self.el);
    });
}

