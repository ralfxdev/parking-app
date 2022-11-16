from time import strptime
from django.db import models
from vehiculos.models import Vehiculo


class Registro(models.Model):
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_salida = models.DateTimeField(null=True, blank=True)
    tiempo_total = models.DurationField(null=True, blank=True)
    total_pagar = models.FloatField(
        null=True, blank=True, default=0.0, verbose_name='Total a pagar')
    pago_status = models.BooleanField(default=False)

    def calc_tiempo_total(self):
        if not self.fecha_salida:
            return None
        return self.fecha_salida - self.fecha_ingreso

    def calc_total_pagar(self):
        if not self.tiempo_total:
            return None
        return round(self.tiempo_total.total_seconds() / 60 * self.vehiculo.tarifa.precio, 2)

    def save(self, *args, **kwargs):
        self.tiempo_total = self.calc_tiempo_total()
        self.total_pagar = self.calc_total_pagar()
        super(Registro, self).save(*args, **kwargs)

    def __str__(self):
        return self.vehiculo.placa
