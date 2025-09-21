import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar, CloseSquare } from "iconsax-react";
import { useState, useRef, useEffect } from "react";
import api from "@/api";
import { formatDate } from "@/utils/dateFormatter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getCurrentAcademicYear } from "@/utils/getAcademicYear";
import { toast } from "sonner";
import { t } from "i18next";

const formSchema = (t) => z.object({
  student: z.string().min(1, t("common.required")),
  classId: z.string().min(1, t("common.required")),
  academicYear: z.string().min(1, t("common.required")),
});

export default function RegistrationsModal({
  classes,
  onRegistred,
  isLimited = false,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      student: "",
      classId: "",
      academicYear: getCurrentAcademicYear(),
    },
  });

  useEffect(() => {
    if (!isFocused || !searchValue) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      api
        .get(`/students/search?search=${encodeURIComponent(searchValue)}`)
        .then((res) => setSearchResults(res.data.data))
        .catch((error) => {
          setSearchResults([]);
          console.log(error);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchValue, isFocused]);

  const handleSelect = (value) => {
    setIsFocused(false);
    const student = searchResults.find((item) => item._id === value);
    setSelectedStudent(student || null);
    form.setValue("student", value);
  };

  const onSubmit = async (data) => {
    await onRegistred(data);
    form.reset();
    setSelectedStudent(null);
    setSearchValue("");
  };

  const handleDialogChange = (open) => {
    if (!open) {
      form.reset();
      setSelectedStudent(null);
      setSearchValue("");
    }
  };

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${
            isLimited
              ? "!text-primary/40 !border-primary/40 hover:bg-primary/10 cursor-not-allowed"
              : "hover:bg-primary/90"
          } text-primary border-primary rounded-lg px-6 py-2 flex items-center gap-2 w-full sm:w-auto`}
          onClick={(e) => {
            if (isLimited) {
              e.preventDefault();
              toast.error(t("students.limitReached"));
            }
          }}
        >
          {t("students.registration.title")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
        <DialogHeader className="border-b-2 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
              {t("students.registration.title")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
            dir="rtl"
          >
            {/* Student Search Field */}
            <FormField
              control={form.control}
              name="student"
              render={() => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm font-medium">
                    {t("students.registration.search")}
                  </FormLabel>
                  <FormControl>
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder={t("students.registration.search")}
                        value={searchValue}
                        onValueChange={setSearchValue}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                          setTimeout(() => setIsFocused(false), 100)
                        }
                        className="flex w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      />

                      {isFocused && (
                        <CommandList className="max-h-30">
                          {loading ? (
                            <div className="p-4 text-center text-muted-foreground">
                              {t("students.registration.search")}...
                            </div>
                          ) : searchResults.length === 0 ? (
                            <CommandEmpty>
                              {t("students.registration.noResults", { searchValue })}
                            </CommandEmpty>
                          ) : (
                            searchResults.map((item) => (
                              <CommandItem
                                key={item._id}
                                value={item._id}
                                onSelect={handleSelect}
                                className="cursor-pointer"
                              >
                                <div>
                                  <span className="font-semibold">{t("students.registration.name")}:</span>{" "}
                                  {item.firstName} {item.lastName}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    {t("students.registration.birthDate")}:
                                  </span>
                                  {formatDate(item.birthDate)}
                                </div>
                              </CommandItem>
                            ))
                          )}
                        </CommandList>
                      )}
                    </Command>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedStudent && (
              <div className="p-3 border rounded-lg bg-muted relative">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudent(null);
                    form.setValue("student", "");
                    setSearchValue("");
                  }}
                  className="absolute top-2 rtl:left-2 ltr:right-2 text-destructive hover:text-destructive/80"
                >
                  <CloseSquare size={18} color="currentColor" />
                </button>
                <div>
                  <span className="font-semibold">{t("students.registration.name")}:</span>{" "}
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </div>
                <div>
                  <span className="font-semibold">{t("students.registration.birthDate")}:</span>
                  {formatDate(selectedStudent.birthDate)}
                </div>
              </div>
            )}

            {/* Class Selection Field */}
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm font-medium">
                    {t("students.registration.class")}
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border border-border rounded-lg">
                        <SelectValue placeholder={t("students.selectClass")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rtl:text-right" align="end">
                      {classes.map((classItem) => (
                        <SelectItem
                          key={classItem._id}
                          value={classItem._id}
                          className="rtl:text-right"
                        >
                          {classItem.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Academic Year Field */}
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm font-medium">
                    {t("students.registration.academicYear")}
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        readOnly
                        className="w-full h-12 pl-10 pr-4 border border-border rounded-lg text-right"
                        {...field}
                      />
                    </FormControl>
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      color="currentColor"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex w-full md:w-1/2 gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  {t("common.save")}
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-muted-foreground hover:bg-background"
                  >
                    {t("common.cancel")}
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
