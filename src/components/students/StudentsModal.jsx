import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Add, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { t } from "i18next";
import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";
import BasicInfoStep from "./studentModalSteps/BasicInfoStep";
import HealthInfoStep from "./studentModalSteps/HealthInfoStep";
import ParentInfoStep from "./studentModalSteps/ParentInfoStep";
import PhotoReviewStep from "./studentModalSteps/PhotoReviewStep";

const studentSchema = (t) =>
  z.object({
    firstName: z.string().min(1, t("common.required")),
    lastName: z.string().min(1, t("common.required")),
    birthDate: z.string().min(1, t("common.required")),
    class: z.string().min(1, t("common.required")),
    bloodGroup: z.string().optional(),
    gender: z.enum(["male", "female"], {
      required_error: t("common.required"),
    }),
    adress: z.string().optional(),
    healthStatus: z.enum(["good", "needs_followup"]).optional(),
    illnessOrAllergy: z.string().optional(),
    takesMedicineRegularly: z.boolean().optional(),
    medicineDetails: z.string().optional(),
    parents: z.object({
      father: z.object({
        name: z.string().min(1, t("common.required")),
        profession: z.string().min(1, t("common.required")),
      }),
      mother: z.object({
        name: z.string().min(1, t("common.required")),
        profession: z.string().min(1, t("common.required")),
      }),
      guardian: z.object({
        relation: z.enum(["father", "mother", "other"]).optional(),
        name: z.string().optional(),
      }),
      email: z.string().email(t("common.invalidEmail")),
      contact: z.string().min(1, t("common.required")),
      secondaryContact: z.string().optional(),
      thirdContact: z.string().optional(),
    }),
    discount: z
      .number({ invalid_type_error: t("classes.validation.priceNumber") })
      .min(0, t("classes.validation.minPrice"))
      .optional(),
    image: z.any().optional(),
  });

const STEPS = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Health Information" },
  { id: 3, title: "Parent Information" },
  { id: 4, title: "Photo & Review" },
];

export default function StudentsModal({
  onAddStudent,
  onUpdateStudent,
  editingStudent = null,
  classes,
  isLimited = false,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(studentSchema(t)),
    defaultValues: {
      firstName: editingStudent?.student?.firstName || "",
      lastName: editingStudent?.student?.lastName || "",
      birthDate: editingStudent?.student?.birthDate?.split("T")[0] || "",
      class: editingStudent?.class?._id || "",
      bloodGroup: editingStudent?.student?.bloodGroup || "",
      gender: editingStudent?.student?.gender || "male",
      adress: editingStudent?.student?.adress || "",
      healthStatus: editingStudent?.student?.healthStatus || "good",
      illnessOrAllergy: editingStudent?.student?.illnessOrAllergy || "",
      takesMedicineRegularly:
        editingStudent?.student?.takesMedicineRegularly || false,
      medicineDetails: editingStudent?.student?.medicineDetails || "",
      parents: {
        father: {
          name: editingStudent?.student?.parents?.father?.name || "",
          profession:
            editingStudent?.student?.parents?.father?.profession || "",
        },
        mother: {
          name: editingStudent?.student?.parents?.mother?.name || "",
          profession:
            editingStudent?.student?.parents?.mother?.profession || "",
        },
        guardian: {
          relation:
            editingStudent?.student?.parents?.guardian?.relation || "father",
          name: editingStudent?.student?.parents?.guardian?.name || "",
        },
        email: editingStudent?.student?.parents?.email || "",
        contact: editingStudent?.student?.parents?.contact || "",
        secondaryContact:
          editingStudent?.student?.parents?.secondaryContact || "",
        thirdContact: editingStudent?.student?.parents?.thirdContact || "",
      },
      discount:
        typeof editingStudent?.discount === "number"
          ? editingStudent.discount
          : 0,
      image: editingStudent?.student?.image || null,
    },
  });

  // Reset form when editing student changes
  useEffect(() => {
    form.reset({
      firstName: editingStudent?.student?.firstName || "",
      lastName: editingStudent?.student?.lastName || "",
      birthDate: editingStudent?.student?.birthDate?.split("T")[0] || "",
      class: editingStudent?.class?._id || "",
      bloodGroup: editingStudent?.student?.bloodGroup || "",
      gender: editingStudent?.student?.gender || "male",
      adress: editingStudent?.student?.adress || "",
      healthStatus: editingStudent?.student?.healthStatus || "good",
      illnessOrAllergy: editingStudent?.student?.illnessOrAllergy || "",
      takesMedicineRegularly:
        editingStudent?.student?.takesMedicineRegularly || false,
      medicineDetails: editingStudent?.student?.medicineDetails || "",
      parents: {
        father: {
          name: editingStudent?.student?.parents?.father?.name || "",
          profession:
            editingStudent?.student?.parents?.father?.profession || "",
        },
        mother: {
          name: editingStudent?.student?.parents?.mother?.name || "",
          profession:
            editingStudent?.student?.parents?.mother?.profession || "",
        },
        guardian: {
          relation:
            editingStudent?.student?.parents?.guardian?.relation || "father",
          name: editingStudent?.student?.parents?.guardian?.name || "",
        },
        email: editingStudent?.student?.parents?.email || "",
        contact: editingStudent?.student?.parents?.contact || "",
        secondaryContact:
          editingStudent?.student?.parents?.secondaryContact || "",
        thirdContact: editingStudent?.student?.parents?.thirdContact || "",
      },
      discount:
        typeof editingStudent?.discount === "number"
          ? editingStudent.discount
          : 0,
      image: editingStudent?.student?.image || null,
    });
  }, [editingStudent, form]);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "firstName",
          "lastName",
          "birthDate",
          "class",
          "gender",
        ];
        break;
      case 2:
        return true;
      case 3:
        fieldsToValidate = [
          "parents.email",
          "parents.contact",
          "parents.father.name",
          "parents.father.profession",
          "parents.mother.name",
          "parents.mother.profession",
        ];
        break;
      case 4:
        return true;
      default:
        return true;
    }

    if (fieldsToValidate.length > 0) {
      return await form.trigger(fieldsToValidate);
    }
    return true;
  };

  const onSubmit = async (data) => {
    console.log("Submited !");
    try {
      setLoading(true);
      const formData = new FormData();

      // Basic info
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("birthDate", data.birthDate);
      formData.append("class", data.class);
      formData.append("gender", data.gender);
      formData.append("adress", data.adress || "");
      formData.append("bloodGroup", data.bloodGroup || "");

      // Health info
      formData.append("healthStatus", data.healthStatus || "good");
      formData.append("illnessOrAllergy", data.illnessOrAllergy || "");
      formData.append("takesMedicineRegularly", data.takesMedicineRegularly);
      formData.append("medicineDetails", data.medicineDetails || "");

      // Parent info
      formData.append("parents[father][name]", data.parents.father.name || "");
      formData.append(
        "parents[father][profession]",
        data.parents.father.profession || ""
      );
      formData.append("parents[mother][name]", data.parents.mother.name || "");
      formData.append(
        "parents[mother][profession]",
        data.parents.mother.profession || ""
      );
      formData.append(
        "parents[guardian][relation]",
        data.parents.guardian.relation || ""
      );
      formData.append(
        "parents[guardian][name]",
        data.parents.guardian.name || ""
      );
      formData.append("parents[email]", data.parents.email || "");
      formData.append("parents[contact]", data.parents.contact || "");
      formData.append(
        "parents[secondaryContact]",
        data.parents.secondaryContact || ""
      );
      formData.append("parents[thirdContact]", data.parents.thirdContact || "");

      // Image handling
      if (data.image && data.image instanceof File) {
        if (editingStudent?.student?.image) {
          formData.append("oldImage", editingStudent.student.image);
        }
        formData.append("image", data.image);
      }
      if (!data.image && editingStudent?.student?.image) {
        formData.append("deleteImage", "true");
        formData.append("oldImage", editingStudent.student.image);
      }

      // Discount
      formData.append("discount", data.discount || 0);

      if (editingStudent) {
        await onUpdateStudent(formData, editingStudent?.student?._id);
      } else {
        await onAddStudent(formData);
      }

      form.reset();
      setCurrentStep(1);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep form={form} classes={classes} />;
      case 2:
        return <HealthInfoStep form={form} />;
      case 3:
        return <ParentInfoStep form={form} />;
      case 4:
        return <PhotoReviewStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingStudent ? (
          <Button
            variant="ghost"
            className="text-primary underline p-1 h-auto font-medium m-0"
          >
            {t("common.edit")}
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              if (isLimited) {
                e.preventDefault();
                toast.error(t("students.limitReached"));
              }
            }}
            className={cn(
              "rounded-lg px-6 py-2 flex items-center gap-2 w-full sm:w-auto",
              isLimited &&
                "bg-primary/30 hover:bg-primary/20 cursor-not-allowed"
            )}
          >
            <Add size="16" color="currentColor" />
            {t("students.addChild")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full bg-card p-6 rounded-2xl max-h-[95vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {editingStudent ? t("students.editChild") : t("students.addChild")}
          </DialogTitle>

          {/* Step Indicator */}

          <div className="text-center mt-2">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}:{" "}
              {STEPS[currentStep - 1].title}
            </p>
          </div>

          <div className="w-full mt-4">
            <Progress
              value={(currentStep / STEPS.length) * 100}
              className="h-1 w-full"
            />
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-hidden"
          >
            <div className="max-h-[55vh] min-h-[18vh] overflow-y-auto">
              {renderStepContent()}
            </div>
          </form>
        </Form>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft2 color="currentColor" className="rtl:rotate-180" />
              {t("common.previous")}
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await validateCurrentStep();
                  if (isValid) nextStep();
                }}
                className="flex items-center gap-2"
              >
                {t("common.next")}
                <ArrowRight2 color="currentColor" className="rtl:rotate-180" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={
                  loading || (editingStudent && !form.formState.isDirty)
                }
                onClick={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2"
              >
                {loading
                  ? t("common.loading")
                  : editingStudent
                  ? t("common.update")
                  : t("common.save")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
