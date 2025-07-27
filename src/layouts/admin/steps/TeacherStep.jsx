import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, UserCheck, Mail, Award } from "lucide-react"

export function TeacherStep({ teachers, classes, categories, onUpdate }) {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    specialization: "",
  })
  const [selectedClasses, setSelectedClasses] = useState([])

  const addTeacher = () => {
    if (!newTeacher.name.trim() || !newTeacher.email.trim()) return

    const teacher = {
      name: newTeacher.name,
      email: newTeacher.email,
      specialization: newTeacher.specialization,
    }

    // Update classes with teacher assignment
    const updatedClasses = classes.map((cls) => {
      if (selectedClasses.includes(cls.id)) {
        return { ...cls, teacherId: teacher.id }
      }
      return cls
    })

    onUpdate([...teachers, teacher], updatedClasses)
    setNewTeacher({ name: "", email: "", specialization: "" })
    setSelectedClasses([])
  }

  const removeTeacher = (teacherId) => {
    const updatedTeachers = teachers.filter((t) => t.id !== teacherId)
    const updatedClasses = classes.map((cls) => {
      if (cls.teacherId === teacherId) {
        const { teacherId: _, ...classWithoutTeacher } = cls
        return classWithoutTeacher
      }
      return cls
    })
    onUpdate(updatedTeachers, updatedClasses)
  }

  const getCategoryName = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId)?.name || ""
  }

  const unassignedClasses = classes.filter((cls) => !cls.teacherId)

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          هذه الخطوة اختيارية. يمكنك إضافة المعلمين وتعيينهم للفصول، أو تخطي هذه الخطوة والقيام بذلك لاحقاً.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة معلم جديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div  className="space-y-4">
              <Label htmlFor="teacherName">اسم المعلم *</Label>
              <Input
                id="teacherName"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="أدخل اسم المعلم"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="teacherEmail">البريد الإلكتروني *</Label>
              <Input
                id="teacherEmail"
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="teacher@example.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="specialization">التخصص</Label>
            <Input
              id="specialization"
              value={newTeacher.specialization}
              onChange={(e) => setNewTeacher((prev) => ({ ...prev, specialization: e.target.value }))}
              placeholder="مثال: تعليم الأطفال"
            />
          </div>

          {unassignedClasses.length > 0 && (
            <div>
              <Label>تعيين للفصول</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {unassignedClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id={`class-${classItem.id}`}
                      checked={selectedClasses.includes(classItem.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedClasses([...selectedClasses, classItem.id])
                        } else {
                          setSelectedClasses(selectedClasses.filter((id) => id !== classItem.id))
                        }
                      }}
                    />
                    <Label htmlFor={`class-${classItem.id}`} className="text-sm">
                      {classItem.name} ({getCategoryName(classItem.categoryId)})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={addTeacher}
            disabled={!newTeacher.name.trim() || !newTeacher.email.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة المعلم
          </Button>
        </CardContent>
      </Card>

      {teachers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">المعلمون المضافون</h3>
          <div className="space-y-4">
            {teachers.map((teacher) => {
              const assignedClasses = classes.filter((cls) => cls.teacherId === teacher.id)

              return (
                <Card key={teacher.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-8 h-8 text-purple-500" />
                        <div>
                          <h4 className="font-medium">{teacher.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{teacher.email}</span>
                          </div>
                          {teacher.specialization && (
                            <div className="flex items-center gap-2 mt-1">
                              <Award className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{teacher.specialization}</span>
                            </div>
                          )}
                          {assignedClasses.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {assignedClasses.map((cls) => (
                                <Badge key={cls.id} variant="secondary" className="text-xs">
                                  {cls.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTeacher(teacher.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {teachers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>
            لم يتم إضافة أي معلمين بعد. يمكنك تخطي هذه الخطوة والمتابعة.
          </p>
        </div>
      )}
    </div>
  )
}
