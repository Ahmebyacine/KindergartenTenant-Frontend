import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, GraduationCap, UserCheck } from "lucide-react"

export function CompletionStep({ data }) {
  const getCategoryName = (categoryId) => {
    return data.categories.find((cat) => cat.id === categoryId)?.name || ""
  }

  const getTeacherName = (teacherId) => {
    return data.teachers.find((t) => t.id === teacherId)?.name || ""
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700 mb-2">تم الإعداد بنجاح!</h2>
        <p className="text-gray-600">
          تم إعداد نظام إدارة الروضة الخاص بك بنجاح. إليك ملخص لما تم إنشاؤه:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">الفئات</h3>
                <p className="text-sm text-gray-600">
                  {data.categories.length} فئة
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {data.categories.map((category) => (
                <div key={category.id} className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-sm">{category.name}</div>
                  {category.ageRange && (
                    <Badge variant="outline" className="text-xs mt-1">
                      {category.ageRange}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Classes Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold">الفصول</h3>
                <p className="text-sm text-gray-600">
                  {data.classes.length} فصل
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {data.classes.map((classItem) => (
                <div key={classItem.id} className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-sm">{classItem.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryName(classItem.categoryId)}
                    </Badge>
                    <span className="text-xs text-gray-600">
                      السعة: {classItem.capacity}
                    </span>
                  </div>
                  {classItem.teacherId && (
                    <div className="text-xs text-purple-600 mt-1">
                      المعلم:
                      {getTeacherName(classItem.teacherId)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teachers Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">المعلمون</h3>
                <p className="text-sm text-gray-600">
                  {data.teachers.length} معلم
                </p>
              </div>
            </div>
            {data.teachers.length > 0 ? (
              <div className="space-y-2">
                {data.teachers.map((teacher) => {
                  const assignedClasses = data.classes.filter((cls) => cls.teacherId === teacher.id)
                  return (
                    <div key={teacher.id} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium text-sm">{teacher.name}</div>
                      <div className="text-xs text-gray-600">{teacher.email}</div>
                      {assignedClasses.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {assignedClasses.map((cls) => (
                            <Badge key={cls.id} variant="secondary" className="text-xs">
                              {cls.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">لم يتم إضافة معلمين</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          الخطوات التالية:
        </h3>
        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
          <li>• ابدأ في تسجيل الطلاب في الفصول</li>
          <li>• قم بإعداد الجداول الزمنية</li>
          <li>• أضف المزيد من المعلمين حسب الحاجة</li>
          <li>• قم بتخصيص إعدادات النظام</li>
        </ul>
      </div>
    </div>
  )
}
