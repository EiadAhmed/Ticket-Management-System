
from django.contrib import admin
from .models import Ticket
from message.models import Message
from django import forms

class MessageInlineForm(forms.ModelForm):
    class Meta:
        model  = Message
        fields = ('content',)            # only field the admin can type into
        widgets = {
            'content': forms.Textarea(attrs={'rows': 3, 'cols': 80}),
        }


# ----------  INLINE ADMIN -------------------------------------------------
class MessageInline(admin.TabularInline):           # or StackedInline
    model  = Message
    form   = MessageInlineForm
    extra  = 1

    # what we show in the table after the object is saved
    readonly_fields = ('owner', 'created_at', 'updated_at')
    fields          = ('content', 'owner', 'created_at', 'updated_at')


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display  = ("id", "title", "status", "priority",
                     "owner", "created_at")
    list_filter   = ("status", "priority")
    search_fields = ("title", "description")
    inlines       = [MessageInline]       
    # This is called after the big "Save" button is pressed
    def save_formset(self, request, form, formset, change):
        # commit=False gives us the objects BEFORE they're saved
        instances = formset.save(commit=False)
        for obj in instances:
            if not obj.pk:                     # it's a NEW message
                obj.owner = request.user
            obj.save()
        formset.save_m2m()           

# ----------  INLINE FORM (owner NOT editable) ----------------------------

# ----------  PARENT ADMIN (Ticket) ----------------------------------------
