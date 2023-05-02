import { Prisma } from '@prisma/client'
import { AppointmentsRepository } from '../appointments-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create(data: Prisma.AppointmentUncheckedCreateInput) {
    const scheduling = await prisma.appointment.create({
      data,
    })

    return scheduling
  }

  async findAppointmentByDateHour(dateHour: Date) {
    const appointment = await prisma.appointment.findFirst({
      where: {
        date_hour: dateHour,
      },
    })

    if (!appointment) {
      return null
    }

    return appointment
  }

  async findAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ) {
    const appointments = await prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(date).startOf('day').toDate(),
              lt: dayjs.utc(date).endOf('day').toDate(),
            },
          },
          {
            professional_id: professionalId,
          },
        ],
      },
      orderBy: {
        date_hour: 'asc',
      },
    })
    return appointments
  }

  async deleteAppointment(appointmentId: string) {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    })
  }
}
