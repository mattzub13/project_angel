import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
const validImageTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
];
const validFileType = [
    ".doc",
    ".docx",
    ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface UploadFileProps {
    label: string;
    cardTitle: string;
    formValue: any;
    helpText?: string;
    successMessage: string;
    selectedFile: File | null;
    selectedFileFunc: (file: File) => void;
    previewFunc: (preview: string | ArrayBuffer | null) => void;
    preview: string | null;
    nullFunc: () => void;
    uplodaFunc: () => Promise<void>;
    isPdf: boolean;
}

export const UploadFile = ({
    label,
    cardTitle,
    formValue,
    helpText,
    successMessage,
    selectedFile,
    selectedFileFunc,
    previewFunc,
    preview,
    nullFunc,
    uplodaFunc,
    isPdf,
}: UploadFileProps) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const dropZoneRef = useRef(null);
    const toast = useRef<Toast>(null);
    const fileInputRef = useRef(null);
    const handleIdCardBoxClick = () => {
        nullFunc();
        setUploadSuccess(false);
        setIsUploading(false);
        setShowUploadModal(true);
    };

    const handleFile = (file: File) => {
        if (file) {
            if (!isPdf && !validImageTypes.includes(file.type)) {
                toast.current?.show({
                    severity: "error",
                    closable: false,
                    summary: "Error al subir",
                    detail: "Formato no valido",
                    life: 4000,
                });
                return;
            } else if (isPdf && !validFileType.includes(file.type)) {
                toast.current?.show({
                    severity: "error",
                    closable: false,
                    summary: "Error al subir",
                    detail: "Formato no valido",
                    life: 4000,
                });
                return;
            }
            selectedFileFunc(file);
            setUploadSuccess(false);

            const reader = new FileReader();
            reader.onloadend = () => {
                previewFunc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
            setShowUploadModal(true);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
            setShowUploadModal(true);
        }
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };
    const closeDialog = () => {
        if (!isUploading) {
            setShowUploadModal(false);
            if (!uploadSuccess) {
                nullFunc();
            }
        }
    };
    const confirmUpload = async () => {
        if (!selectedFile) {
            toast.current?.show({
                severity: "warn",
                summary: "No hay archivo",
                detail: "Por favor selecciona un archivo primero",
                life: 3000,
            });
            return;
        }

        try {
            setIsUploading(true);
            await uplodaFunc();

            setUploadSuccess(true);

            setTimeout(() => {
                setShowUploadModal(false);
                toast.current?.show({
                    severity: "success",
                    summary: "Carga exitosa",
                    detail: successMessage,
                    life: 3000,
                });
            }, 1500);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error en la carga",
                detail: "No se pudo cargar el archivo. Por favor, intenta nuevamente.",
                life: 5000,
            });
            setIsUploading(false);
        }
    };

    const renderDialogFooter = () => {
        if (isUploading) return null;
        if (uploadSuccess) return null;

        return (
            <div className="flex justify-end gap-3 p-4 bg-gray-50 rounded-b-lg border-t border-gray-100">

                <Button label="Cancelar"
                    icon="pi pi-times"
                    onClick={() => !isUploading && closeDialog()} />

                <Button label="Subir archivo"
                    icon="pi pi-upload"
                    onClick={confirmUpload}
                    className="px-4 py-2 border-blue_green hver:bg-blue_green/90 transition-colors rounded-lg shadow-sm"
                    disabled={!selectedFile}
                />
            </div>
        );
    };
    return (
        <div className="flex flex-col space-y-3 ">
            <Toast ref={toast} />
            <label className="text-neutral-dark font-medium flex items-center">
                {label} <span className="text-red-500 ml-1">*</span>
            </label>

            <div
                ref={dropZoneRef}
                onClick={handleIdCardBoxClick}
                className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all  ${dragActive
                    ? "border-blue_green bg-blue_green/90"
                    : "border-neutral-gray hover:border-primary-dark hover:bg-primary-light/5 mr-12"
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {formValue ? (
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
                            <i className="pi pi-check-circle text-2xl text-green-500"></i>
                        </div>
                        <div className="flex-1">
                            <span className="text-neutral-dark font-medium">
                                Archivo cargado correctamente
                            </span>
                            <p className="text-xs text-neutral-dark/70 mt-1">
                                Haz clic para cambiar el archivo si lo necesitas
                            </p>
                        </div>
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-rounded p-button-outlined"
                            onClick={(e) => {
                                e.stopPropagation();
                                nullFunc();
                                setUploadSuccess(false);
                                setIsUploading(false);
                                setShowUploadModal(true);
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 rounded-full bg-primary-light/20 flex items-center justify-center mb-4">
                            <i className="pi pi-upload text-3xl text-primary-dark"></i>
                        </div>
                        <p className="text-lg font-medium text-neutral-dark mb-2">
                            {cardTitle}
                        </p>
                        <p className="text-sm text-neutral-dark/70 mb-4 text-center">
                            Arrastra y suelta o haz clic para seleccionar
                        </p>
                        <div className="flex gap-3">
                            {isPdf ? (
                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                    <i className="pi pi-file-pdf text-red-500 mr-1.5"></i>
                                    PDF
                                </span>
                            ) : (
                                <>
                                    <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                        <i className="pi pi-image text-blue-500 mr-1.5"></i>
                                        JPG
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                        <i className="pi pi-image text-green-500 mr-1.5"></i>
                                        PNG
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {helpText && (
                <div className="flex items-center text-neutral-dark/70 text-xs">
                    <i className="pi pi-info-circle mr-2 text-primary-dark/80"></i>
                    <p>{helpText}</p>
                </div>
            )}
            <Dialog
                visible={showUploadModal}
                onHide={() => {
                    if (!isUploading && !uploadSuccess) {
                        closeDialog();
                    }
                }}
                header={uploadSuccess ? null : <>{cardTitle}</>}
                footer={renderDialogFooter()}
                closable={!isUploading && !uploadSuccess}
                showHeader={!uploadSuccess}
                contentClassName="p-0"
                headerClassName="bg-white border-b border-neutral-gray p-4"
                className="w-full max-w-4xl"
                breakpoints={{ "960px": "90vw", "640px": "95vw" }}
            >
                <Toast ref={toast} />
                {isUploading ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-white">
                        <ProgressSpinner
                            style={{ width: "60px", height: "60px" }}
                            strokeWidth="4"
                            animationDuration=".5s"
                        />
                        <p className="mt-6 text-center text-neutral-dark font-medium">
                            Subiendo tu archivo, por favor espera...
                        </p>
                        <p className="mt-2 text-center text-neutral-gray text-sm">
                            Esto puede tomar unos segundos
                        </p>
                    </div>
                ) : uploadSuccess ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-green-50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                            <i className="pi pi-check-circle text-4xl text-green-500"></i>
                        </div>
                        <h3 className="text-xl font-medium text-green-800 mb-2">
                            ¡Archivo subido con éxito!
                        </h3>
                        <p className="text-center text-green-700 mb-6">{successMessage}</p>
                    </div>
                ) : (
                    <div className="p-6 bg-white">
                        <div
                            ref={fileInputRef}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`relative border-2 border-dashed rounded-xl p-8 transition-colors
                      ${dragActive
                                    ? "border-primary-dark bg-primary-light/10"
                                    : "border-neutral-gray"
                                }`}
                        >
                            <input
                                type="file"
                                accept={
                                    isPdf ? ".doc, .docx, .pdf" : ".jpg,.jpeg,.png,.webp,.svg"
                                }
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {preview ? (
                                <div className="flex flex-col items-center">
                                    {preview.startsWith("data:image") ? (
                                        <div className="relative mb-4 p-3 bg-white shadow-md rounded-lg border border-neutral-gray/20">
                                            <img
                                                src={preview}
                                                alt="Vista previa"
                                                className="max-h-64 max-w-full object-contain rounded"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Button
                                                    icon="pi pi-times"
                                                    className="p-button-rounded p-button-danger p-button-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        nullFunc();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full p-6 mb-4 bg-gray-50 border border-neutral-gray rounded-lg text-center">
                                            <i className="pi pi-file-pdf text-4xl text-primary-dark"></i>
                                            <p className="mt-3 text-neutral-dark font-medium">
                                                Archivo seleccionado
                                            </p>
                                            <p className="mt-1 text-sm text-neutral-gray">
                                                {selectedFile?.name}
                                            </p>
                                            <Button
                                                icon="pi pi-times"
                                                label="Cambiar archivo"
                                                className="p-button-text p-button-sm mt-3"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    nullFunc();
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center justify-center gap-2 bg-primary-light/20 p-3 rounded-lg mt-2">
                                        <i className="pi pi-check-circle text-green-600"></i>
                                        <p className="text-sm text-neutral-dark">
                                            Haz clic en &quot;Subir archivo&quot; para cargar este
                                            documento
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="bg-primary-light/10 p-4 rounded-full mb-4">
                                        <i className="pi pi-upload text-4xl text-primary-dark"></i>
                                    </div>
                                    <p className="text-lg font-medium text-neutral-dark mb-2">
                                        Arrastra y suelta tu archivo aquí
                                    </p>
                                    <p className="text-sm text-neutral-gray mb-4">
                                        o haz clic para seleccionar
                                    </p>
                                    <div className="flex gap-3 mb-4">
                                        {isPdf ? (
                                            <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                                <i className="pi pi-file-pdf text-red-500 mr-1.5"></i>
                                                PDF
                                            </span>
                                        ) : (
                                            <>
                                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                                    <i className="pi pi-image text-blue-500 mr-1.5"></i>
                                                    JPG
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-neutral-dark border border-gray-200">
                                                    <i className="pi pi-image text-green-500 mr-1.5"></i>
                                                    PNG
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-xs text-neutral-gray mt-2 mb-4">
                                        Tamaño máximo: 10MB
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};