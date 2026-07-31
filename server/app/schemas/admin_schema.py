from marshmallow import Schema, fields


class DashboardStatsSchema(Schema):
    total_users = fields.Int(dump_only=True)
    total_bookings = fields.Int(dump_only=True)
    total_services = fields.Int(dump_only=True)
    total_payments = fields.Int(dump_only=True)
    total_inventory_items = fields.Int(dump_only=True)


class DashboardSummarySchema(Schema):
    statistics = fields.Nested(DashboardStatsSchema)
    recent_bookings = fields.List(fields.Dict())